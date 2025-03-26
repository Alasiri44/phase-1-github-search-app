// function which searches for users as per the client
function searchUsers(){
    const myForm = document.getElementById('github-form');
    myForm.addEventListener('submit', function(e){
        e.preventDefault();

        const inputByUser = document.getElementById('search').value;
        fetch(`https://api.github.com/search/users?q=${inputByUser}`)
        .then(res => res.json())
        .then(data => {

            const userList = document.getElementById('user-list');
            const reposList = document.getElementById('repos-list');
            userList.textContent = '';
            reposList.textContent = '';
           for(let item of data.items){
                
                const userList = document.getElementById('user-list');
                const reposList = document.getElementById('repos-list');

                
                const newUser = document.createElement('li');
                newUser.textContent = item.login;
                userList.appendChild(newUser);

                const newUserRepo = document.createElement('li');
                const newUserRepoLink = document.createElement('a');
                newUserRepoLink.textContent = `https://github.com/${item.login}`;
                newUserRepoLink.href = `https://github.com/${item.login}`;
                newUserRepoLink.target = '_blank';
                newUserRepo.appendChild(newUserRepoLink);
                reposList.appendChild(newUserRepo);

                //adding a click event to the names created
                newUser.addEventListener('click', function(){
                    newUser.style.backgroundColor = 'green';
                    fetch(`https://api.github.com/users/${newUser.textContent}/repos`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        
                        data.forEach(element => {
                            console.log(element.html_url);

                            userList.textContent = '';
                            userList.appendChild(newUser);

                            

                            const newUserRepo = document.createElement('li');
                            const newUserRepoLink = document.createElement('a');
                            
                            newUserRepoLink.textContent = element.html_url;
                            newUserRepoLink.href = element.html_url;  
                            newUserRepo.appendChild(newUserRepoLink)                      
                            reposList.appendChild(newUserRepo);

                        });
                    }
                    )
                })
           }
        }
        )
    })
}


function main(){
    searchUsers();
}

document.addEventListener('DOMContentLoaded', function(){
    main();
})