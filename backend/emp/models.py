from django.db import models
import random
import string
from datetime import date

def generate_emp_id():
    while True:
        emp_id = ''.join(random.choices(string.digits, k=6))
        if not Employee.objects.filter(Emp_id=emp_id).exists():
            return emp_id

class Employee(models.Model):
    Full_name = models.CharField(max_length=100)
    Emp_id = models.CharField(max_length=20, unique=True, default=generate_emp_id, editable=False)
    Department = models.CharField(max_length=50)
    Email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return f"{self.Full_name} ({self.Emp_id})"


class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Leave', 'Leave'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    attendance_date = models.DateField(default=date.today)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Absent')
    check_in_time = models.TimeField(null=True, blank=True)
    check_out_time = models.TimeField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('employee', 'attendance_date')
        ordering = ['-attendance_date', 'employee']
    
    def __str__(self):
        return f"{self.employee.Full_name} - {self.attendance_date} - {self.status}"

