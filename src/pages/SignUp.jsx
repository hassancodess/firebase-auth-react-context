// Router
import { Link, useNavigate } from 'react-router-dom'
// Formik & Yup
import { useFormik } from 'formik'
import * as Yup from 'yup'
// Context
import { useUserAuth } from '../context/userAuthContext'
function SignUp() {
  // Router
  const navigate = useNavigate()
  // Context
  const { signUp } = useUserAuth()
  // Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(30, 'Cannot be more than 30 characters'),
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password does not match')
        .required('Required'),
    }),
    onSubmit: async () => {
      console.log(formik.values)
      const userCredential = await signUp(
        formik.values.name,
        formik.values.email,
        formik.values.password
      )
      console.log(userCredential.user)
    },
  })

  return (
    <form className='min-h-screen flex flex-col' onSubmit={formik.handleSubmit}>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-secondary text-secondary-content px-6 py-8 rounded shadow-md w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='name'
            placeholder='Full Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p class='mb-3 text-sm text-red-600 dark:text-red-500'>
              <span class='font-medium'>Oops!</span> {formik.errors.name}
            </p>
          ) : null}
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
            <p class='mb-3 text-sm text-red-600 dark:text-red-500'>
              <span class='font-medium'>Oops!</span> {formik.errors.email}
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
            <p class='mb-3 text-sm text-red-600 dark:text-red-500'>
              <span class='font-medium'>Oops!</span> {formik.errors.password}
            </p>
          ) : null}
          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p class='mb-3 text-sm text-red-600 dark:text-red-500'>
              <span class='font-medium'>Oops!</span>{' '}
              {formik.errors.confirmPassword}
            </p>
          ) : null}

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-accent  hover:bg-accent-focus duration-200 focus:outline-none my-1'
          >
            Create Account
          </button>

          <div className='text-center text-sm text-grey-dark mt-4'>
            By signing up, you agree to the
            <a className='no-underline border-b border-grey-dark ' href='#'>
              Terms of Service
            </a>{' '}
            and
            <a className='no-underline border-b border-grey-dark ' href='#'>
              Privacy Policy
            </a>
          </div>
        </div>

        <div className='mt-6'>
          Already have an account?
          <Link to='/sign-in' className='no-underline border-b border-blue'>
            Log in
          </Link>
          .
        </div>
      </div>
    </form>
  )
}

export default SignUp
