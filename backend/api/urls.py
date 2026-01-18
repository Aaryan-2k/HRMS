from django.urls import path
import api.views as api_views

app_name = 'api'

urlpatterns = [
    # Employee endpoints
    path('employees/', api_views.EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', api_views.EmployeeDetailView.as_view(), name='employee-detail'),
    
    # Attendance endpoints
    path('attendance/', api_views.BulkAttendanceCreateView.as_view(), name='attendance-bulk-create'),
    path('attendance/by-date/', api_views.AttendanceByDateView.as_view(), name='attendance-by-date'),
    path('employees/<str:emp_id>/attendance/', api_views.EmployeeAttendanceHistoryView.as_view(), name='employee-attendance-history'),
]