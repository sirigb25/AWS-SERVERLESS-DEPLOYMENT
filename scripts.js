// ------------------------------
// Configuration
// ------------------------------
var API_BASE = "https://nyv70bzo9e.execute-api.us-east-1.amazonaws.com/prod";

// ------------------------------
// Save Student Data (POST)
// ------------------------------
$('#savestudent').click(function() {
    var inputData = {
        "studentID": $('#studentid').val(),
        "name": $('#name').val(),
        "class": $('#class').val(),
        "age": $('#age').val()
    };

    // Basic validation
    if (!inputData.studentID || !inputData.name || !inputData.class || !inputData.age) {
        $('#studentError').text("All fields are required.");
        $('#studentSaved').text('');
        return;
    }

    $.ajax({
        url: API_BASE,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            var res = JSON.parse(response.body);
            $('#studentSaved').text(res.message);
            $('#studentError').text('');
            
            // Clear input fields after saving
            $('#studentid').val('');
            $('#name').val('');
            $('#class').val('');
            $('#age').val('');
        },
        error: function(xhr, status, error) {
            $('#studentError').text("Error saving student data: " + error);
            $('#studentSaved').text('');
        }
    });
});

// ------------------------------
// Retrieve All Students (GET)
// ------------------------------
$('#getstudents').click(function() {
    $.ajax({
        url: API_BASE,
        type: 'GET',
        success: function(response) {
            var students = JSON.parse(response.body);
            $('#studentTable tbody').empty(); // Clear existing rows

            if (students.length === 0) {
                $('#studentError').text("No student data found.");
                return;
            }

            $.each(students, function(i, data) {
                $("#studentTable tbody").append("<tr>\
                    <td>" + data['studentID'] + "</td>\
                    <td>" + data['name'] + "</td>\
                    <td>" + data['class'] + "</td>\
                    <td>" + data['age'] + "</td>\
                </tr>");
            });
            $('#studentError').text('');
        },
        error: function(xhr, status, error) {
            $('#studentError').text("Error retrieving student data: " + error);
        }
    });
});
