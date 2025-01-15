const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Create buttons for each subject
function createButtons() {
    const subjects = [...new Set(courses.map(course => course.subject))];  // getting unique subjects
    const buttonContainer = document.getElementById('courses');
    buttonContainer.innerHTML = '';  // clear previous buttons

    // Button all   
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.onclick = () => displayCourses();  // Display all courses
    buttonContainer.appendChild(allButton);

    // Filter buttons by subject
    subjects.forEach(subject => {
        const button = document.createElement('button');
        button.textContent = subject;
        button.onclick = () => displayCourses(subject);
        buttonContainer.appendChild(button);
    });
}

// Show all courses or filter by subject
function displayCourses(subject = '') {
    const coursesContainer = document.getElementById('info');
    coursesContainer.innerHTML = '';

    const filteredCourses = subject ? courses.filter(course => course.subject === subject) : courses;

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course-item');
        // Check if the course is completed
        const checkMark = course.completed ? '<i class="fas fa-check"></i>' : '';

        const sum =

            courseElement.innerHTML = `
            <button>${course.subject} ${course.number} ${checkMark}</button>
        `;

        coursesContainer.appendChild(courseElement);
    });
    updateTotalCredits(filteredCourses);
}

// Function to sum the credits
function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const creditContainer = document.getElementById('total-credits');
    creditContainer.textContent = `The total number of courses listed below is ${totalCredits}`;
}

// Inirtialize buttons and display all courses
createButtons();
displayCourses();

// hamburguer menu
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const navigator = document.querySelector('.navigator');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    navigator.classList.toggle('open');
});