const user = {
  username: ['public', 'modifiable'],
  profilePic: ['public', 'modifiable'],
  firstname: ['public', 'modifiable'],
  lastname: ['public', 'modifiable'],
  language: ['public', 'modifiable', { default: 'english' } ],
  password: ['private', 'modifiable','resetable'],
  email: ['private', 'modifiable'],
};

