'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line react/prop-types
const Navbar = ({ mobileMenu, setMobileMenu, color }) => {
  const [mobileSubMenu, setMobileSubMenu] = useState('');
  const [mobileSubMenuSub, setMobileSubMenuSub] = useState('');
  const [menuTitle, setMenuTitle] = useState('');

  const handleMenu = () => {
    setMobileMenu(false);
    setMobileSubMenu('');
    setMobileSubMenuSub('');
  };

  const handleSubMenu = (e, id) => {
    e.preventDefault();
    setMobileSubMenu(id);

    if (e.target.tagName === 'A') {
      const content = e.target.firstChild.textContent;
      setMenuTitle(content);
    } else {
      const content = e.target.parentElement.textContent;
      setMenuTitle(content);
    }
  };

  const handleSubMenuSub = (e, id) => {
    e.preventDefault();
    setMobileSubMenuSub(id);
    if (e.target.tagName === 'A') {
      const content = e.target.firstChild.textContent;
      setMenuTitle(content);
    } else {
      const content = e.target.parentElement.textContent;
      setMenuTitle(content);
    }
  };

  const handleGoBack = () => {
    if (mobileSubMenuSub) {
      setMobileSubMenuSub('');
      return;
    }
    if (mobileSubMenu) {
      setMobileSubMenu('');
      return;
    }
  };

  return (
    <div className='menu-block-wrapper'>
      <div
        onClick={handleMenu}
        className={`menu-overlay ${mobileMenu && 'active'}`}
      />
      <nav
        className={`menu-block ${mobileMenu && 'active'}`}
        id='append-menu-header'
      >
        <div className={`mobile-menu-head ${mobileSubMenu && 'active'}`}>
          <div onClick={handleGoBack} className='go-back'>
            <Image
              className='dropdown-icon'
              src='/assets/img_placeholder/icon-black-long-arrow-right.svg'
              alt='cheveron-right'
              width={16}
              height={16}
            />
          </div>
          <div className='current-menu-title'>{menuTitle}</div>
          <div onClick={handleMenu} className='mobile-menu-close'>
            ×
          </div>
        </div>
        <ul className={`site-menu-main ${color}`}>
          {/* Global navbar */}
          <li
            onClick={(e) => handleSubMenu(e, 1)}
            className='nav-item nav-item-has-children'
          >
            <Link href='#' className='nav-link-item drop-trigger'>
              Demo
              <Image
                className='dropdown-icon'
                src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                alt='cheveron-right'
                width={16}
                height={16}
              />
            </Link>
            <ul
              className={`sub-menu ${mobileSubMenu === 1 && 'active'}`}
              id='submenu-1'
            >
              <li className='sub-menu--item'>
                <Link href='/'>home 01</Link>
              </li>
              <li className='sub-menu--item'>
                <Link href='/home-2'>home 02</Link>
              </li>
              <li className='sub-menu--item'>
                <Link href='/home-3'>home 03</Link>
              </li>
              <li className='sub-menu--item'>
                <Link href='/home-4'> home 04</Link>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <Link href='/about' className='nav-link-item'>
              About
            </Link>
          </li>
          <li
            onClick={(e) => handleSubMenu(e, 2)}
            className='nav-item nav-item-has-children'
          >
            <Link href='#' className='nav-link-item drop-trigger'>
              Services
              <Image
                className='dropdown-icon'
                src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                alt='cheveron-right'
                width={16}
                height={16}
              />
            </Link>
            <ul
              className={`sub-menu ${mobileSubMenu === 2 && 'active'}`}
              id='submenu-2'
            >
              <li className='sub-menu--item'>
                <Link href='/services'>Services</Link>
              </li>
              <li className='sub-menu--item'>
                <Link href='/service-details'>Service Details</Link>
              </li>
            </ul>
          </li>
          <li
            onClick={(e) => handleSubMenu(e, 3)}
            className='nav-item nav-item-has-children'
          >
            <Link href='#' className='nav-link-item drop-trigger'>
              Pages
              <Image
                className='dropdown-icon'
                src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                alt='cheveron-right'
                width={16}
                height={16}
              />
            </Link>
            <ul
              className={`sub-menu ${mobileSubMenu === 3 && 'active'}`}
              id='submenu-3'
            >
              <li
                onClick={(e) => handleSubMenuSub(e, 1)}
                className='sub-menu--item nav-item-has-children'
              >
                <Link href='#' data-menu-get='h3' className='drop-trigger'>
                  Blogs
                  <Image
                    className='dropdown-icon'
                    src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                    alt='cheveron-right'
                    width={16}
                    height={16}
                  />
                </Link>
                <ul
                  className={`sub-menu shape-none ${
                    mobileSubMenuSub === 1 && 'active'
                  }`}
                  id='submenu-4'
                >
                  <li className='sub-menu--item'>
                    <Link href='/blog'>blogs</Link>
                  </li>
                  <li className='sub-menu--item'>
                    <Link href='/blog-details'>blog details</Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={(e) => handleSubMenuSub(e, 2)}
                className='sub-menu--item nav-item-has-children'
              >
                <Link href='#' data-menu-get='h3' className='drop-trigger'>
                  Team
                  <Image
                    className='dropdown-icon'
                    src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                    alt='cheveron-right'
                    width={16}
                    height={16}
                  />
                </Link>
                <ul
                  className={`sub-menu shape-none ${
                    mobileSubMenuSub === 2 && 'active'
                  }`}
                  id='submenu-5'
                >
                  <li className='sub-menu--item'>
                    <Link href='/team'>Teams</Link>
                  </li>
                  <li className='sub-menu--item'>
                    <Link href='/team-details'>Teams Details</Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={(e) => handleSubMenuSub(e, 3)}
                className='sub-menu--item nav-item-has-children'
              >
                <Link href='#' data-menu-get='h3' className='drop-trigger'>
                  FAQ
                  <Image
                    className='dropdown-icon'
                    src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                    alt='cheveron-right'
                    width={16}
                    height={16}
                  />
                </Link>
                <ul
                  className={`sub-menu shape-none ${
                    mobileSubMenuSub === 3 && 'active'
                  }`}
                  id='submenu-6'
                >
                  <li className='sub-menu--item'>
                    <Link href='/faq-1'>FAQ-1</Link>
                  </li>
                  <li className='sub-menu--item'>
                    <Link href='/faq-2'>FAQ-2</Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={(e) => handleSubMenuSub(e, 4)}
                className='sub-menu--item nav-item-has-children'
              >
                <Link href='#' data-menu-get='h3' className='drop-trigger'>
                  Portfolio
                  <Image
                    className='dropdown-icon'
                    src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                    alt='cheveron-right'
                    width={16}
                    height={16}
                  />
                </Link>
                <ul
                  className={`sub-menu shape-none ${
                    mobileSubMenuSub === 4 && 'active'
                  }`}
                  id='submenu-7'
                >
                  <li className='sub-menu--item'>
                    <Link href='/portfolio'>Portfolio</Link>
                  </li>
                  <li className='sub-menu--item'>
                    <Link href='/portfolio-details'>
                      Portfolio Details
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='sub-menu--item'>
                <Link
                  href='/pricing'
                  data-menu-get='h3'
                  className='drop-trigger'
                >
                  Pricing
                </Link>
              </li>
              <li
                onClick={(e) => handleSubMenuSub(e, 5)}
                className='sub-menu--item nav-item-has-children'
              >
                <Link href='#' data-menu-get='h3' className='drop-trigger'>
                  Utilities
                  <Image
                    className='dropdown-icon'
                    src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                    alt='cheveron-right'
                    width={16}
                    height={16}
                  />
                </Link>
                <ul
                  className={`sub-menu shape-none ${
                    mobileSubMenuSub === 5 && 'active'
                  }`}
                  id='submenu-8'
                >
                  <li className='sub-menu--item'>
                    <Link href='/not-found'>404 Not Found</Link>
                  </li>
                  <li className='sub-menu--item'>
                    <Link href='/login'>Login</Link>
                  </li>
                  <li className='sub-menu--item'>
                    <Link href='/signup'>Signup</Link>
                  </li>
                  <li className='sub-menu--item'>
                    <Link href='/reset-password'>Reset Password</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <Link href='/contact' className='nav-link-item'>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
