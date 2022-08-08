import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <>
      <main class='flex flex-col justify-center items-center '>
        <h1 class='text-9xl font-extrabold text-white tracking-widest'>404</h1>
        <div class='bg-secondary px-2 text-sm rounded rotate-12 absolute mb-16'>
          Page Not Found
        </div>
        <Link to='/' class='btn btn-secondary mt-10 mx-auto'>
          Go to Home
        </Link>
      </main>
    </>
  )
}

export default NotFound
