const userList = document.querySelector('#users');

async function getUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('You have run into an error!');
    }
    const users = await response.json();
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerHTML = `${user.name} | ${user.email}`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error(
      'We ran into a problem retrieving the data requested:',
      error,
    );
  }
}

userList.textContent = 'Loading...';
getUser();
