// const awsConfig = {
//     identityPoolId: '1:165dca54-cccf-4e5c-87e0-cf4142dbc137',
//     region: 'ap-south-1',
//     userPoolId: 'ap-south-1_CwSAxb32b',
//     userPoolWebClientId: 'm4fg7m15hdgc7hhohfjo19ohd',
//     // authenticationFlowType: 'CUSTOM_AUTH' 
//     authenticationFlowType: 'USER_SRP_AUTH' | 'USER_PASSWORD_AUTH' | 'CUSTOM_AUTH',
//   }
  
//   export default awsConfig;

import Amplify, { Auth, Hub, Logger } from 'aws-amplify';
// other imports
export default Amplify.configure({
      Auth: {
        userPoolId: 'ap-south-1_CwSAxb32b', 
        userPoolWebClientId: 'm4fg7m15hdgc7hhohfjo19ohd',
        // authenticationFlowType: 'CUSTOM_AUTH' ,
    authenticationFlowType: 'USER_SRP_AUTH' | 'USER_PASSWORD_AUTH' | 'CUSTOM_AUTH',
        
      },
    })


  // import {Auth } from 'aws-amplify'
//   onSignOut (){
//     Auth.signOut().then((data) => {
//       this.router.navigate(['/']);
//       console.log(data);
//     })
//   }

// Auth.signUp({
//     username: `+917895328523`,
//     password: Date.now().toString(),
//   }).then((signup) => {
//     this.signUpForm.reset();
//     console.log('SignUp Response: ', signup);
//     this.showSnackbar(`Awesome! Signup was Success `, 'success');
//   }).catch(error => {
//     console.log('SignUp Error: ', error);
//     this.showSnackbar(`Something went wrong! `, 'danger');
//   });

//   // your.component.ts
// Auth.signIn(`+917895328523`).then((signInUser) => {
//     this.user = signInUser;
//     this.toppopup.instance.show();
//   }).catch(error => {
//     console.log('SignIn Error: ', error);
//   });

//   Auth.sendCustomChallengeAnswer(this.user, this.signInCodeForm.value.signInCode)
//           .then((response) => {
//             this.signInCodeForm.reset();
//             this.toppopup.instance.hide();
//             this.showSnackbar('Awesome! Enjoy the Content ', 'success')
//             this.router.navigate(['/explore'])
//             this.showCard = true;
//           }).catch(error => {
//             console.log('Challenge Error', error);
//           });