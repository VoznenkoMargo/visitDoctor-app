
    let em = ""
    export const emailValidation = ({target}) =>{
        const regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const newValue = regExp.test(target.value);
        em = target.value;
        if (!newValue){
            target.classList.add("error");
            console.error("Wrong email")
        }else{
            target.classList.remove("error");
        };
    }
    export const passwordValidation = ({target}) =>{
        const regExp = /./;
        const newValue = regExp.test(target.value);
        if (!newValue){
            target.classList.add("error");
            console.error("Wrong password")
        }else{
            getToken(em, target.value);
            target.classList.remove("error");
        };
    }
    const getToken = async (email, passsword) => {
        const result = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: `${email}`, password: `${passsword}` })
        })
            .then(response => response.text())
            .then(token => {localStorage.setItem("authToken", token);
            }).catch(error => console.error(error));
    }

  