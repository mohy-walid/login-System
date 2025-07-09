"use strict"

        const loginEmailInput = document.getElementById("loginEmail");
        const loginPassInput = document.getElementById('loginPassword');
        const signupNameInput = document.getElementById('signupName');
        const signupEmailInput = document.getElementById('signupEmail');
        const signupPassInput = document.getElementById('signupPassword');

        let usersList =JSON.parse(localStorage.getItem("users")) || [];

        
        function formValidation(element) {
            const regex = {
                signupEmail:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
                signupName: /^[a-zA-Z0-9_-]{3,15}$/,
                 signupPassword:/^[a-zA-Z0-9]{5,20}$/,
                loginEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/
            };

            if (regex[element.id] && regex[element.id].test(element.value)) {
                showSuccess();
                return true;
            } else {
                showError();
                return false;
            }
        }

     
        function showSuccess() {
            const successElement = document.getElementById('success');
            const errorElement = document.getElementById('erro');
            
            if (successElement) successElement.classList.remove('d-none');
            if (errorElement) errorElement.classList.add('d-none');
        }


        function showError() {
            const successElement = document.getElementById('success');
            const errorElement = document.getElementById('erro');
            
            if (successElement) successElement.classList.add('d-none');
            if (errorElement) errorElement.classList.remove('d-none');
        }

    
        function emailExists(email) {
            return usersList.some(user => user.email === email);
        }

     
        function signUpUser() {
            const signUpBtn = document.querySelector('#sign-up');
            
            if (signUpBtn) {
                signUpBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    if (!signupNameInput || !signupEmailInput || !signupPassInput) {
                        return;
                    }

    
                    if (formValidation(signupEmailInput) && 
                        formValidation(signupNameInput) && 
                        formValidation(signupPassInput)) {
                        
                 
                        if (emailExists(signupEmailInput.value)) {
                            alert('البريد الإلكتروني موجود بالفعل!');
                            return;
                        }

                        const newUser = {
                            name: signupNameInput.value,
                            email: signupEmailInput.value,
                            password: signupPassInput.value
                        };

                        usersList.push(newUser);
                        localStorage.setItem("users", JSON.stringify(usersList));
                        alert('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.');
                        clearForm();
                        
                       
                    }
                });
            }
        }

           function loginUser() {
    const loginBtn = document.querySelector('#loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();

            if (!loginEmailInput || !loginPassInput) return;

            const email = loginEmailInput.value.trim();
            const password = loginPassInput.value;

            if (email === '' || password === '') {
                showLoginError('All inputs is required');
                return;
            }

            const user = usersList.find(u => u.email === email && u.password === password);

            if (user) {
          
                localStorage.setItem("loggedUser", JSON.stringify(user));

                window.location.href = "html/welcom.html";
            } else {
                showLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
            }
        });
    }
}


        function showLoginError(message) {
            const errorElement = document.getElementById('erroLogin');
            if (errorElement) {
                errorElement.classList.remove('d-none');
                errorElement.textContent = message;
            }
        }


        function logoutUser() {
            const logoutBtn = document.querySelector('#logoutBtn');
            
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
   
                    window.currentUser = null;
                    

                    clearForm();
                    
                    showPage('loginPage');
                });
            }
        }

        function clearForm() {
            if (signupNameInput) signupNameInput.value = '';
            if (signupEmailInput) signupEmailInput.value = '';
            if (signupPassInput) signupPassInput.value = '';
            if (loginEmailInput) loginEmailInput.value = '';
            if (loginPassInput) loginPassInput.value = '';
        }

        function addInputInteraction() {

            if (signupEmailInput) {
                signupEmailInput.addEventListener('blur', () => formValidation(signupEmailInput));
            }
            if (signupNameInput) {
                signupNameInput.addEventListener('blur', () => formValidation(signupNameInput));
            }
            if (signupPassInput) {
                signupPassInput.addEventListener('blur', () => formValidation(signupPassInput));
            }
        }


        document.addEventListener('DOMContentLoaded', function() {

            signUpUser();
            loginUser();
            logoutUser();
            

            addInputInteraction();
        });
    document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const welcomeEl = document.getElementById("welcomeMessage");

  if (user && welcomeEl) {
    welcomeEl.textContent = `مرحباً بك، ${user.name}!`;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedUser");
      window.location.href = "../index.html";
    });
  }
});
