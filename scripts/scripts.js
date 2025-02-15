const pswdBtn = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

pswdBtn.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    pswdBtn.textContent = type === 'password' ? 'Show Password' : 'Hide Password';
});