import { useFormik } from 'formik';
import classes from './CreateJob.module.css';
import Button from './UI/Button';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { jobsActions } from '../store/jobs-slice';
import Card from './UI/Card';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
    const navigate = useNavigate();
    const dispatchFn = useDispatch();
    const formik = useFormik({
        initialValues: {
            companyName: '',
            phoneNumber: '',
            description: '',
            requirements: '',
            tags: '',
            salary: '',
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required('Company Name is required.'),
            phoneNumber: Yup.string()
                .required('Phone Number is required.')
                .matches(
                    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    'Phone number is not valid'
                ),
            description: Yup.string().required('Description is required.'),
            requirements: Yup.string().required(
                'Job requirements are required.'
            ),
            tags: Yup.string().required('Jobs relevant tags are required.'),
            salary: Yup.string().required('Salary amount is required.'),
        }),
        onSubmit(values, formik) {
            console.log(values, formik);
            dispatchFn(
                jobsActions.postJob({
                    ...values,
                    companyId: Math.random(),
                    tags: values.tags.split(',').map((t) => t.trim()),
                })
            );
            formik.setSubmitting(false);
            formik.resetForm();
            navigate('/jobs');
        },
    });

    return (
        <Card>
            <form
                method='post'
                className={classes.form}
                onSubmit={formik.handleSubmit}
            >
                <h1>Create a Job Post</h1>
                <div className={classes.field}>
                    <label htmlFor='companyName'>Company Name</label>
                    <input
                        id='companyName'
                        type='text'
                        name='companyName'
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={classes.error}>
                        {formik.errors.companyName &&
                            formik.touched.companyName &&
                            formik.errors.companyName}
                    </div>
                </div>

                <div className={classes.field}>
                    <label htmlFor='description'>Description</label>
                    <input
                        id='description'
                        type='text'
                        name='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <input
                        name='descDoc'
                        accept='.txt'
                        id='description-doc'
                        type='file'
                        hidden
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const fileSize = e.target.files[0].size;
                            if (fileSize <= 1024 * 16) {
                                const fileReader = new FileReader();
                                fileReader.onload = () => {
                                    if (fileReader.readyState === 2) {
                                        formik.setFieldValue(
                                            'description',
                                            fileReader.result
                                        );
                                    }
                                };
                                fileReader.readAsText(file);
                            } else {
                                // formik.setFieldValue('description', '');
                                formik.setFieldError(
                                    'description',
                                    'Job description document with maximum length of 16KB.'
                                );
                            }
                        }}
                    />
                    <div className={classes.error}>
                        {formik.errors.description &&
                            formik.touched.description &&
                            formik.errors.description}
                    </div>
                </div>

                <div className={classes.field}>
                    <label htmlFor='requirements'>Job Requirements</label>
                    <input
                        id='requirements'
                        type='text'
                        name='requirements'
                        value={formik.values.requirements}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={classes.error}>
                        {formik.errors.requirements &&
                            formik.touched.requirements &&
                            formik.errors.requirements}
                    </div>
                </div>

                <div className={classes.field}>
                    <label htmlFor='tags'>
                        Relevant Tags{' '}
                        <sub>
                            ( Please use comma separated values for multiple
                            skills. )
                        </sub>
                    </label>
                    <input
                        id='tags'
                        type='text'
                        name='tags'
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={classes.error}>
                        {formik.errors.tags &&
                            formik.touched.tags &&
                            formik.errors.tags}
                    </div>
                </div>

                <div className={classes.field}>
                    <label htmlFor='salary'>Salary / Hour</label>
                    <input
                        id='salary'
                        type='text'
                        name='salary'
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={classes.error}>
                        {formik.errors.salary &&
                            formik.touched.salary &&
                            formik.errors.salary}
                    </div>
                </div>

                <div className={classes.field}>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input
                        id='phoneNumber'
                        type='text'
                        name='phoneNumber'
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={classes.error}>
                        {formik.errors.phoneNumber &&
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber}
                    </div>
                </div>

                <div className={classes.actions}>
                    <Button
                        type='submit'
                        disabled={
                            formik.isSubmitting ||
                            !(formik.isValid && formik.dirty)
                        }
                    >
                        Create Post
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default CreateJob;
