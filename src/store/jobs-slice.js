import { createSlice } from '@reduxjs/toolkit';

const jobsSlice = createSlice({
    name: 'auth',
    initialState: {
        jobs: [],
        selectedJobDetails: {},
    },
    reducers: {
        loadJobs(state, action) {
            state.jobs = action.payload;
        },
        applyJob(state, action) {
            const appliedJobIndex = state.jobs.findIndex(
                (job) => job.companyId === action.payload.companyId
            );
            state.jobs[appliedJobIndex].applied = true;
            if (!state.jobs[appliedJobIndex]?.applicantDetails) {
                state.jobs[appliedJobIndex].applicantDetails = [];
            }
            state.jobs[appliedJobIndex].applicantDetails.push([
                action.payload.emailId,
            ]);
        },
        withdrawJob(state, action) {
            const appliedJobIndex = state.jobs.findIndex(
                (job) => job.companyId === action.payload.companyId
            );
            state.jobs[appliedJobIndex].applied = false;
            state.jobs[appliedJobIndex].applicantDetails = state.jobs[
                appliedJobIndex
            ].applicantDetails.filter(
                (emailId) => emailId !== action.payload.emailId
            );
        },
        postJob(state, action) {
            state.jobs.push(action.payload);
        },
        getJobApplicationDetails(state, actions) {
            state.selectedJobDetails = state.jobs.find(
                (job) => job.companyId === actions.payload
            );
        },
    },
});

export default jobsSlice;

export const jobsActions = jobsSlice.actions;
