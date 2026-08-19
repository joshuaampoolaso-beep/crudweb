const API_URL =
    "https://script.google.com/macros/s/AKfycbxhNh2O6CnkS587OYvOBVEMZ2YkmrXSfi0S3SGmK1KvNYK3htOwzzxaFUmuRJNTkVEfiQ/exec";


// ===============================
// ADD
// ===============================

function addStudent() {

    const student = {

        action: "create",

        firstName:
            document.getElementById("firstName").value,

        lastName:
            document.getElementById("lastName").value,

        email:
            document.getElementById("email").value,

        course:
            document.getElementById("course").value,

        yearLevel:
            document.getElementById("yearLevel").value
    };


    if (
        !student.firstName ||
        !student.lastName ||
        !student.email ||
        !student.course ||
        !student.yearLevel
    ) {

        alert("Please complete all fields.");

        return;
    }


    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(student)

    })

    .then(response => response.json())

    .then(result => {

        alert(result.message);

        if (result.success) {

            clearForm();

            loadStudents();

        }

    })

    .catch(error => {

        console.error(error);

        alert("Error adding student.");

    });
}


// ===============================
// READ
// ===============================

function loadStudents() {

    fetch(API_URL + "?action=get")

    .then(response => response.json())

    .then(result => {

        if (!result.success) {

            alert(result.message);

            return;
        }

        const table =
            document.getElementById("studentTable");

        table.innerHTML = "";


        result.data.forEach(student => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${student.id}</td>

                <td>${student.firstName}</td>

                <td>${student.lastName}</td>

                <td>${student.email}</td>

                <td>${student.course}</td>

                <td>${student.yearLevel}</td>

            `;


            // CLICK ROW TO LOAD DATA
            row.onclick = function() {

                document.getElementById("studentId").value =
                    student.id;

                document.getElementById("firstName").value =
                    student.firstName;

                document.getElementById("lastName").value =
                    student.lastName;

                document.getElementById("email").value =
                    student.email;

                document.getElementById("course").value =
                    student.course;

                document.getElementById("yearLevel").value =
                    student.yearLevel;

            };


            table.appendChild(row);

        });

    })

    .catch(error => {

        console.error(error);

        alert("Error loading records.");

    });
}


// ===============================
// UPDATE
// ===============================

function updateStudent() {

    const id =
        document.getElementById("studentId").value;


    if (!id) {

        alert(
            "Please click a student record first."
        );

        return;
    }


    const student = {

        action: "update",

        id: id,

        firstName:
            document.getElementById("firstName").value,

        lastName:
            document.getElementById("lastName").value,

        email:
            document.getElementById("email").value,

        course:
            document.getElementById("course").value,

        yearLevel:
            document.getElementById("yearLevel").value

    };


    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(student)

    })

    .then(response => response.json())

    .then(result => {

        alert(result.message);

        if (result.success) {

            clearForm();

            loadStudents();

        }

    })

    .catch(error => {

        console.error(error);

        alert("Error updating student.");

    });
}


// ===============================
// DELETE
// ===============================

function deleteStudent() {

    const id =
        document.getElementById("studentId").value;


    if (!id) {

        alert(
            "Please click a student record first."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;
    }


    const data = {

        action: "delete",

        id: id

    };


    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(data)

    })

    .then(response => response.json())

    .then(result => {

        alert(result.message);

        if (result.success) {

            clearForm();

            loadStudents();

        }

    })

    .catch(error => {

        console.error(error);

        alert("Error deleting student.");

    });
}


// ===============================
// CLEAR FORM
// ===============================

function clearForm() {

    document.getElementById("studentId").value = "";

    document.getElementById("firstName").value = "";

    document.getElementById("lastName").value = "";

    document.getElementById("email").value = "";

    document.getElementById("course").value = "";

    document.getElementById("yearLevel").value = "";

}
