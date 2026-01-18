from rest_framework import serializers
from emp.models import Employee, Attendance
from datetime import datetime


class EmployeeSerializer(serializers.ModelSerializer):
    """Serializer for Employee model with all fields and validation"""
    
    class Meta:
        model = Employee
        fields = ['id', 'Full_name', 'Emp_id', 'Department', 'Email', 'created_at', 'updated_at']
        read_only_fields = ['id', 'Emp_id', 'created_at', 'updated_at']
    
    def validate_Email(self, value):
        """Validate email uniqueness, excluding current instance on update"""
        if self.instance:
            if Employee.objects.exclude(id=self.instance.id).filter(Email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        else:
            if Employee.objects.filter(Email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    """Serializer for Attendance model with nested employee details"""
    employee_name = serializers.CharField(source='employee.Full_name', read_only=True)
    employee_id = serializers.CharField(source='employee.Emp_id', read_only=True)
    
    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'employee_id', 'attendance_date', 
                  'status', 'check_in_time', 'check_out_time', 'notes']
        read_only_fields = ['id']
    
    def validate_status(self, value):
        """Validate attendance status"""
        valid_statuses = ['Present', 'Absent', 'Leave']
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}")
        return value


class BulkAttendanceSerializer(serializers.Serializer):
    """Serializer for bulk attendance creation/update"""
    id = serializers.IntegerField(help_text="Employee ID")
    status = serializers.CharField(default='Absent', help_text="Present, Absent, or Leave")
    checkIn = serializers.CharField(required=False, allow_blank=True, help_text="Check-in time in HH:MM AM/PM format")
    attendance_date = serializers.DateField(required=False, help_text="Attendance date in YYYY-MM-DD format")
    notes = serializers.CharField(required=False, allow_blank=True, help_text="Optional notes")
    
    def validate_status(self, value):
        """Validate attendance status"""
        valid_statuses = ['Present', 'Absent', 'Leave']
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}")
        return value


class EmployeeAttendanceHistorySerializer(serializers.ModelSerializer):
    """Serializer for employee with attendance history"""
    attendance_history = AttendanceSerializer(source='attendance_set', many=True, read_only=True)
    total_records = serializers.SerializerMethodField()
    
    class Meta:
        model = Employee
        fields = ['id', 'Full_name', 'Emp_id', 'Department', 'Email', 'created_at', 
                  'updated_at', 'attendance_history', 'total_records']
        read_only_fields = ['id', 'Emp_id', 'created_at', 'updated_at', 'attendance_history', 'total_records']
    
    def get_total_records(self, obj):
        """Get total attendance records for the employee"""
        return obj.attendance_set.count()