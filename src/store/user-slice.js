import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [
            {
                userName: 'P S K Abdul Nawaz',
                emailId: 'princenawaz007@gmail.com',
                firstName: 'P S K',
                lastName: 'Abdul Nawaz',
                skills: ['Angular', 'React', 'Typescript', 'Javascript'],
                githubUserName: 'prince-nawaz',
                projects: [
                    'angular-15-standalone-single-spa',
                    'Angular-7-Recipe-Project',
                    'Angular-JDTT',
                    'angular-web-shared-wroker',
                    'ethereum-smart-contract-inbox',
                    'kickstart-smart-contract',
                    'lottery-react',
                    'lottery-smart-contract',
                    'ng-recipe-book-latest',
                    'prince-nawaz',
                    'react-meals-github',
                    'react-nextjs-ssr-ssg',
                    'react-redux-advanced',
                    'react-ssr',
                    'single-spa-ng-react',
                ],
                phoneNumber: '9999999999',
            },
            {
                userName: 'William Johnson',
                emailId: 'william.johnson@example.com',
                firstName: 'William ',
                lastName: 'Johnson',
                skills: ['Typescript', 'Javascript'],
                githubUserName: 'prince-nawaz',
                projects: [
                    'angular-15-standalone-single-spa',
                    'Angular-7-Recipe-Project',
                    'Angular-JDTT',
                    'angular-web-shared-wroker',
                    'ethereum-smart-contract-inbox',
                    'kickstart-smart-contract',
                    'lottery-react',
                    'lottery-smart-contract',
                    'ng-recipe-book-latest',
                    'prince-nawaz',
                    'react-meals-github',
                    'react-nextjs-ssr-ssg',
                    'react-redux-advanced',
                    'react-ssr',
                    'single-spa-ng-react',
                ],
                phoneNumber: '9999999999',
            },
            {
                userName: 'Sophia Anderson',
                emailId: 'sophia.anderson@example.com',
                firstName: 'Sophia',
                lastName: 'Anderson',
                skills: ['Angular', 'Javascript'],
                githubUserName: 'prince-nawaz',
                projects: [
                    'angular-15-standalone-single-spa',
                    'Angular-7-Recipe-Project',
                    'Angular-JDTT',
                    'angular-web-shared-wroker',
                    'ethereum-smart-contract-inbox',
                    'kickstart-smart-contract',
                    'lottery-react',
                    'lottery-smart-contract',
                    'ng-recipe-book-latest',
                    'prince-nawaz',
                    'react-meals-github',
                    'react-nextjs-ssr-ssg',
                    'react-redux-advanced',
                    'react-ssr',
                    'single-spa-ng-react',
                ],
                phoneNumber: '9999999999',
            },
        ],
    },
    reducers: {
        addUserDetails(state, action) {
            state.users[0].userName = action.payload.userName;
            state.users[0].emailId = action.payload.emailId;
            state.users[0].firstName = action.payload.firstName;
            state.users[0].lastName = action.payload.lastName;
            state.users[0].phoneNumber = action.payload.phoneNumber;
            state.users[0].skills = action.payload.skills.split(',');
            state.users[0].projects = action.payload.projects.split(',');
        },
        updateUserDetails(state, action) {
            state.users[0].userName = action.payload.userName;
            state.users[0].emailId = action.payload.emailId;
            state.users[0].firstName = action.payload.firstName;
            state.users[0].lastName = action.payload.lastName;
            state.users[0].phoneNumber = action.payload.phoneNumber;
            state.users[0].skills = action.payload.skills.split(',');
            state.users[0].projects = action.payload.projects.split(',');
        },
    },
});

export default userSlice;

export const userActions = userSlice.actions;
