// Router
import { Link, useNavigate } from 'react-router-dom'
// Formik
import { useFormik } from 'formik'
import * as Yup from 'yup'
// Context
import { useUserAuth } from '../context/userAuthContext'
function SignIn() {
  // Router
  const navigate = useNavigate()
  // Context
  const { logIn } = useUserAuth()
  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: () => {
      console.log(formik.values)
    },
  })
  return (
    <form className='min-h-screen flex flex-col' onSubmit={formik.handleSubmit}>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-secondary text-secondary-content px-6 py-8 rounded shadow-md w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign In</h1>

          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='email'
            placeholder='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className='mb-3 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {formik.errors.email}
            </p>
          ) : null}
          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className='mb-3 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span>{' '}
              {formik.errors.password}
            </p>
          ) : null}
          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-accent  hover:bg-accent-focus duration-200 focus:outline-none my-1'
          >
            Log In
          </button>
        </div>

        <div className='mt-6'>
          Don't have an account? &nbsp;
          <Link to='/sign-up' className='no-underline border-b border-blue'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignIn
