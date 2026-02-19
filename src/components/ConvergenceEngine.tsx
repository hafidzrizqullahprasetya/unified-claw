'use client';
import Image from 'next/image';

export default function ConvergenceEngine() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Crab Image - Centered */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Image
          src="/assets/crab.png"
          alt="Crab - The Unified Claw"
          width={1600}
          height={1200}
          className="w-full h-full object-contain"
          style={{ maxWidth: '1600px', maxHeight: '1200px' }}
          priority
        />
      </div>
    </div>
  );
}
