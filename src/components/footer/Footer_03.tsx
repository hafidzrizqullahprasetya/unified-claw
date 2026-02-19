import Image from 'next/image';
import Link from 'next/link';

const Footer_03 = () => {
  return (
    <footer id='section-footer-3'>
      <div className='bg-black text-white'>
        {/* Section Spacer */}
        <div className='py-20 xl:py-[130px]'>
          {/* Footer Top */}
          <div>
            {/* Section Container */}
            <div className='global-container'>
              {/* Footer Content */}
              <div className='grid-col-1 grid items-center gap-10 md:grid-cols-2'>
                {/* Section Content Block */}
                <div>
                  <h1 className='font-raleway text-white'>Let’s talk</h1>
                </div>
                {/* Section Content Block */}
                <div className='jos flex flex-col gap-10 md:gap-[50px]'>
                  <p className='text-lg font-semibold leading-[1.33] md:text-xl lg:text-2xl'>
                    Together, well create a tailored plan to ensure your
                    success. Well breathe life into your brand. We work hand in
                    hand to bring your dreams to fruition.
                  </p>
                </div>
              </div>
              {/* Footer Content */}
              {/* Footer Contact */}
              <div className='mt-11 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <div className='rounded-[10px] bg-[#121212] px-11 py-5 text-center font-raleway font-bold leading-[1.33] text-[#F6F6EB] transition-all duration-300 hover:bg-[#381FD1] xl:text-2xl xxl:text-3xl'>
                  <Link href='mailto:favdevs@gmail.com'>
                  favdevs@gmail.com
                  </Link>
                </div>
                <div className='rounded-[10px] bg-[#121212] px-11 py-5 text-center font-raleway font-bold leading-[1.33] text-[#F6F6EB] transition-all duration-300 hover:bg-[#381FD1] xl:text-2xl xxl:text-3xl'>
                  <Link href='tel:+088-3457-9210'>+880 1345-921025</Link>
                </div>
                <div className='rounded-[10px] bg-[#121212] px-11 py-5 text-center font-raleway font-bold leading-[1.33] text-[#F6F6EB] transition-all duration-300 hover:bg-[#381FD1] xl:text-2xl xxl:text-3xl'>
                  <address className='not-italic'>
                    4140 Parker Rd. Mexico
                  </address>
                </div>
              </div>
              {/* Footer Contact */}
            </div>
            {/* Section Container */}
          </div>
          {/* Footer Top */}
          {/* Footer Bottom */}
          <div className='mt-[100px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Footer Widgets Block */}
              <div className='grid gap-x-10 gap-y-[60px] md:grid-cols-2 lg:flex lg:grid-cols-4 lg:justify-between lg:gap-x-20'>
                {/* Footer Widget Item */}
                <div className='flex flex-col gap-y-6 md:max-w-xs xl:max-w-[480px]'>
                  <Link href='/' className='inline-block'>
                    <Image
                      src='/assets/img_placeholder/logo-light.png'
                      alt='logo'
                      width={96}
                      height={24}
                    />
                  </Link>
                  <p>
                    Our mission is to harness the power of AI to solve complex
                    business challenges &amp; decision-makers with data-driven
                    insights, and enhance user experiences across digital
                    platforms.
                  </p>
                  <p>
                    © Copyright {new Date().getFullYear()}, All Rights Reserved
                    by Favdevs
                  </p>
                </div>
                {/* Footer Widget Item */}
                {/* Footer Widget Item */}
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
          {/* Footer Bottom */}
        </div>
        {/* Section Spacer */}
      </div>
    </footer>
  );
};

export default Footer_03;
