import Image from 'next/image';
import Link from 'next/link';

const LogoLight = () => {
  return (
    <Link href='/'>
      <Image src='/assets/img_placeholder/th-1/logo.png' alt='AIMass' width='96' height='24' />
    </Link>
  );
};

export default LogoLight;
