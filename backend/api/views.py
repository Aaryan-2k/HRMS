from rest_framework import generics, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from emp.models import Employee, Attendance
from .serializers import (
    EmployeeSerializer, 
    AttendanceSerializer, 
    BulkAttendanceSerializer,
    EmployeeAttendanceHistorySerializer
)
from datetime import datetime


class EmployeeListCreateView(generics.ListCreateAPIView):
    """
    List all employees or create a new employee
    GET: Returns list of all employees
    POST: Creates a new employee with auto-generated Emp_id
    """
    queryset = Employee.objects.all().order_by('-created_at')
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['Full_name', 'Emp_id', 'Email', 'Department']
    ordering_fields = ['created_at', 'Full_name', 'Department']
    
    def perform_create(self, serializer):
        """Save new employee with auto-generated ID"""
        serializer.save()


class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a specific employee
    GET: Returns employee details
    PUT/PATCH: Updates employee information
    DELETE: Deletes the employee
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    lookup_field = 'pk'


class AttendanceByDateView(APIView):
    """
    Get attendance records for a specific date
    Query parameter: date (YYYY-MM-DD format)
    """
    
    def get(self, request):
        """Fetch attendance records for a specific date"""
        date_str = request.query_params.get('date')
        
        if not date_str:
            return Response(
                {'error': 'Date parameter is required (format: YYYY-MM-DD)'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            attendance_date = parse_date(date_str)
            if not attendance_date:
                raise ValueError("Invalid date format")
            
            attendance_records = Attendance.objects.filter(
                attendance_date=attendance_date
            ).select_related('employee').order_by('employee__Full_name')
            
            serializer = AttendanceSerializer(attendance_records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except ValueError:
            return Response(
                {'error': 'Invalid date format. Use YYYY-MM-DD'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class BulkAttendanceCreateView(APIView):
    """
    Create or update attendance records in bulk
    POST: Expects a list of attendance records
    Each record should contain:
    - id: employee id
    - status: 'Present', 'Absent', or 'Leave'
    - checkIn: time string in HH:MM AM/PM format (optional)
    - attendance_date: date in YYYY-MM-DD format (optional, defaults to today)
    - notes: optional notes
    """
    
    def post(self, request):
        """Bulk create/update attendance records"""
        records = request.data if isinstance(request.data, list) else [request.data]
        
        # Validate each record
        serializer = BulkAttendanceSerializer(data=records, many=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        created_records = []
        errors = []
        
        for record_data in serializer.validated_data:
            try:
                emp_id = record_data.get('id')
                status_value = record_data.get('status', 'Absent')
                check_in = record_data.get('checkIn')
                attendance_date = record_data.get('attendance_date', datetime.now().date())
                notes = record_data.get('notes', '')
                
                # Get employee
                employee = get_object_or_404(Employee, id=emp_id)
                
                # Parse check_in time if provided and status is Present
                check_in_time = None
                if check_in and status_value == 'Present':
                    try:
                        check_in_time = datetime.strptime(check_in, '%I:%M %p').time()
                    except ValueError:
                        pass
                
                # Create or update attendance record
                attendance, created = Attendance.objects.update_or_create(
                    employee=employee,
                    attendance_date=attendance_date,
                    defaults={
                        'status': status_value,
                        'check_in_time': check_in_time if status_value == 'Present' else None,
                        'notes': notes
                    }
                )
                
                created_records.append(AttendanceSerializer(attendance).data)
                
            except Exception as e:
                errors.append({
                    'emp_id': record_data.get('id'),
                    'error': str(e)
                })
        
        response_data = {
            'message': 'Attendance records processed successfully',
            'count': len(created_records),
            'records': created_records
        }
        
        if errors:
            response_data['errors'] = errors
        
        return Response(response_data, status=status.HTTP_201_CREATED)


class EmployeeAttendanceHistoryView(APIView):
    """
    Get attendance history for a specific employee
    Can fetch by employee ID or Emp_id (emp code)
    
    URL parameter: emp_id (can be employee ID or Emp_id code)
    Query parameter: limit (optional, defaults to 30)
    """
    
    def get(self, request, emp_id):
        """Fetch employee details with attendance history"""
        try:
            # Try to find employee by ID first, then by Emp_id
            employee = None
            try:
                employee = Employee.objects.get(id=emp_id)
            except Employee.DoesNotExist:
                employee = Employee.objects.get(Emp_id=emp_id)
            
            # Get limit from query params
            limit = request.query_params.get('limit', 30)
            try:
                limit = int(limit)
            except (ValueError, TypeError):
                limit = 30
            
            # Get attendance records ordered by date descending
            attendance_records = Attendance.objects.filter(
                employee=employee
            ).order_by('-attendance_date')[:limit]
            
            # Manually construct response to avoid serializer depth issues
            response_data = {
                'employee': {
                    'id': employee.id,
                    'Full_name': employee.Full_name,
                    'Emp_id': employee.Emp_id,
                    'Department': employee.Department,
                    'Email': employee.Email,
                    'created_at': employee.created_at,
                    'updated_at': employee.updated_at
                },
                'attendance_history': AttendanceSerializer(attendance_records, many=True).data,
                'total_records': Attendance.objects.filter(employee=employee).count()
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Employee.DoesNotExist:
            return Response(
                {'error': f'Employee with ID or Emp_id {emp_id} not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )