import Image from 'next/image';
import Link from 'next/link';

const Footer_02 = () => {
  return (
    <footer id='footer-2' className='relative'>
      <div className='absolute -top-[77px] left-1/2 z-10 h-[77px] w-full -translate-x-1/2 bg-[url(/assets/img_placeholder/th-2/arc-bottom-shape-1.svg)] bg-cover bg-center bg-no-repeat'></div>
      <div className='relative z-[1] overflow-hidden bg-black text-white'>
        {/* Section Container */}
        <div className='pb-10 pt-1 lg:pt-7 xl:pt-[68px]'>
          {/* Footer Top */}
          <div>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='mx-auto mb-10 text-center md:mb-16 md:max-w-lg lg:mb-20 lg:max-w-xl xl:max-w-3xl'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] text-white sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  Let s get started and enjoy the power of AI
                </h2>
              </div>
              {/* Section Content Block */}
              {/* Footer Subscriber Form */}
              <form action='#' method='post'>
                <div className='relative mx-auto h-[60px] max-w-[500px]'>
                  <input
                    type='email'
                    name='newsletter-email'
                    id='newsletter-email'
                    placeholder='Enter your email'
                    className='p-y-[18px] h-full w-full rounded-[50px] border-[1px] border-white bg-transparent px-[24px] pr-20 outline-none sm:pr-48'
                    required=''
                  />
                  <button
                    type='submit'
                    className='absolute right-[5px] top-[50%] inline-flex h-[50px] -translate-y-[50%] items-center gap-x-[10px] rounded-[50px] bg-colorViolet px-6 transition-all duration-300 hover:bg-colorOrangyRed'
                  >
                    <span className='hidden sm:inline-block'>Get Started</span>
                    <Image
                      src='/assets/img_placeholder/th-1/arrow-right-large.svg'
                      alt='newsletter'
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </form>
              {/* Footer Subscriber Form */}
            </div>
            {/* Section Container */}
          </div>
          {/* Footer Top */}
          {/* Footer Center */}
          <div className='mt-16 xl:mt-20 xxl:mt-[100px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Footer Widgets Block */}
              <div className='grid gap-x-10 gap-y-[60px] sm:grid-cols-2 md:grid-cols-4 lg:flex lg:justify-between lg:gap-x-20'>
                {/* Footer Widget */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Primary Pages
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[10px] capitalize'>
                    <li>
                      <Link
                        href='/'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/about'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/services'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/pricing'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/contact'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget */}
                {/* Footer Widget Item */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Utility pages
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[10px] capitalize'>
                    <li>
                      <Link
                        href='/signup'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/login'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/not-found'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        404 Not found
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/reset-password'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Password Reset
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
                {/* Footer Widget Item */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Utility pages
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[10px] capitalize'>
                    <li>
                      <Link
                        href='/signup'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/login'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/not-found'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        404 Not found
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/reset-password'
                        className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                      >
                        Password Reset
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
                {/* Footer Widget Item */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Socials
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[15px] capitalize'>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.facebook.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/facebook-icon-white.svg'
                            alt='facebook-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Facebook</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.twitter.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/twitter-icon-white.svg'
                            alt='twitter-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Twitter</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.instagram.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/instagram-icon-white.svg'
                            alt='instagram-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Instagram</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.linkedin.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/linkedin-icon-white.svg'
                            alt='linkedin-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Linkedin</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
              </div>
              {/* Footer Widgets Block */}
            </div>
            {/* Section Container */}
          </div>
          {/* Footer Center */}
          {/* Footer Separator */}
          <div className='global-container'>
            <div className='mb-10 mt-[60px] h-[1px] w-full bg-white' />
          </div>
          {/* Footer Separator */}
          {/* Footer Bottom */}
          <div>
            <div className='global-container'>
              <div className='flex flex-wrap items-center justify-center gap-5 text-center md:justify-between md:text-left'>
                <Link href='/'>
                  <Image
                    src='/assets/img_placeholder/logo-light.png'
                    alt='logo-light'
                    width={111}
                    height={23}
                  />
                </Link>
                <p>
                  © Copyright {new Date().getFullYear()}, All Rights Reserved by
                  Favdevs
                </p>
              </div>
            </div>
          </div>
          {/* Footer Bottom */}
        </div>
        {/* Section Container */}
        {/* Background Gradient */}
        <div className='absolute left-1/2 top-[80%] -z-[1] h-[1280px] w-[1280px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#5636C7] to-[#5028DD] blur-[250px]'></div>
      </div>
    </footer>
  );
};

export default Footer_02;
