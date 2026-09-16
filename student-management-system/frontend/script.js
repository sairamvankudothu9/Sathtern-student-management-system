const API_URL = "/api/students";

const modal = document.getElementById("studentModal");
const studentForm = document.getElementById("studentForm");
const formTitle = document.getElementById("formTitle");

const databaseId = document.getElementById("studentDatabaseId");
const studentId = document.getElementById("studentId");
const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentPhone = document.getElementById("studentPhone");
const studentCourse = document.getElementById("studentCourse");
const studentYear = document.getElementById("studentYear");
const studentAddress = document.getElementById("studentAddress");

const searchInput = document.getElementById("searchInput");
const studentTable = document.getElementById("studentTable");
const emptyMessage = document.getElementById("emptyMessage");
const message = document.getElementById("message");

async function loadStudents(search = "") {
    try {
        const response = await fetch(
            `${API_URL}?search=${encodeURIComponent(search)}`
        );

        if (!response.ok) throw new Error("Unable to load students");

        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        showMessage(error.message, "error");
    }
}

function displayStudents(students) {
    studentTable.innerHTML = "";

    if (students.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${escapeHTML(student.student_id)}</td>
            <td>${escapeHTML(student.name)}</td>
            <td>${escapeHTML(student.email)}</td>
            <td>${escapeHTML(student.phone || "-")}</td>
            <td>${escapeHTML(student.course)}</td>
            <td>${student.year}</td>
            <td>${escapeHTML(student.address || "-")}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            </td>
        `;

        studentTable.appendChild(row);
    });
}

function openAddForm() {
    formTitle.textContent = "Add Student";
    studentForm.reset();
    databaseId.value = "";
    modal.style.display = "flex";
}

function closeForm() {
    modal.style.display = "none";
    studentForm.reset();
    databaseId.value = "";
}

async function editStudent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) throw new Error("Student not found");

        const student = await response.json();

        databaseId.value = student.id;
        studentId.value = student.student_id;
        studentName.value = student.name;
        studentEmail.value = student.email;
        studentPhone.value = student.phone || "";
        studentCourse.value = student.course;
        studentYear.value = student.year;
        studentAddress.value = student.address || "";

        formTitle.textContent = "Update Student";
        modal.style.display = "flex";
    } catch (error) {
        showMessage(error.message, "error");
    }
}

studentForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = databaseId.value;

    const student = {
        student_id: studentId.value.trim(),
        name: studentName.value.trim(),
        email: studentEmail.value.trim(),
        phone: studentPhone.value.trim(),
        course: studentCourse.value,
        year: Number(studentYear.value),
        address: studentAddress.value.trim()
    };

    try {
        const response = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Operation failed");
        }

        closeForm();
        showMessage(result.message, "success");
        loadStudents(searchInput.value.trim());
    } catch (error) {
        showMessage(error.message, "error");
    }
});

async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete student");
        }

        showMessage(result.message, "success");
        loadStudents(searchInput.value.trim());
    } catch (error) {
        showMessage(error.message, "error");
    }
}

function searchStudents() {
    loadStudents(searchInput.value.trim());
}

function clearSearch() {
    searchInput.value = "";
    loadStudents();
}

searchInput.addEventListener("input", function() {
    loadStudents(searchInput.value.trim());
});

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") searchStudents();
});

function showMessage(text, type) {
    message.innerHTML = `
        <div class="${type}-message">${escapeHTML(text)}</div>
    `;

    setTimeout(() => {
        message.innerHTML = "";
    }, 3000);
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

window.addEventListener("click", function(event) {
    if (event.target === modal) closeForm();
});

loadStudents();
