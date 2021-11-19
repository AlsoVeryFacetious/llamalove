let fetchData = async (url) =>{
    fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
            }).then(res => res.json())
            .then(data => {
            console.log(data)
            });
}

const handleClick = evt => {
    url = `http://localhost:3000/login`
    fetchData(url);
}

// document.getElementById('btn').addEventListener('click', handleClick)