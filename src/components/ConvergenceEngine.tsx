'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Floating Icons Components
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-12 md:h-12">
    <circle cx="12" cy="12" r="12" fill="#25D366" fillOpacity="0.2"/>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" fill="#25D366"/>
  </svg>
);

const RetailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-12 md:h-12">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#FF6B6B" fillOpacity="0.2"/>
    <path d="M3 9h18M9 21V9" stroke="#FF6B6B" strokeWidth="2"/>
    <rect x="6" y="12" width="6" height="6" fill="#FF6B6B"/>
  </svg>
);

const ServiceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-12 md:h-12">
    <circle cx="12" cy="12" r="10" fill="#4ECDC4" fillOpacity="0.2"/>
    <path d="M12 6v6l4 2" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SaaSIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-12 md:h-12">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#A78BFA" fillOpacity="0.2"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#A78BFA"/>
  </svg>
);

const PaymentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-12 md:h-12">
    <rect x="2" y="5" width="20" height="14" rx="2" fill="#F59E0B" fillOpacity="0.2"/>
    <rect x="2" y="8" width="20" height="4" fill="#F59E0B"/>
    <rect x="6" y="14" width="6" height="2" rx="1" fill="#F59E0B"/>
  </svg>
);

const DataCubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 md:w-24 md:h-24">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V12" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const RoboticClaw = ({ isGrabbing, isHolding }: { isGrabbing: boolean; isHolding: boolean }) => {
  return (
    <motion.div
      className="relative z-20"
      initial={{ y: -20 }}
      animate={{ y: isGrabbing ? 0 : -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Main Arm */}
      <div className="relative">
        {/* Upper Arm */}
        <motion.div
          className="w-16 md:w-24 h-32 md:h-48 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg relative overflow-hidden"
          style={{
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Metallic Lines */}
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full" style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
            }}/>
          </div>
          {/* Glow Lines */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-purple-500"
            style={{ top: '30%' }}
            animate={{ opacity: isGrabbing ? 1 : 0.5, boxShadow: isGrabbing ? '0 0 20px rgba(168, 85, 247, 0.8)' : '0 0 10px rgba(168, 85, 247, 0.5)' }}
          />
          <motion.div
            className="absolute left-0 right-0 h-1 bg-cyan-500"
            style={{ top: '50%' }}
            animate={{ opacity: isGrabbing ? 1 : 0.5, boxShadow: isGrabbing ? '0 0 20px rgba(6, 182, 212, 0.8)' : '0 0 10px rgba(6, 182, 212, 0.5)' }}
          />
        </motion.div>

        {/* Joint */}
        <motion.div
          className="w-20 md:w-28 h-12 md:h-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-lg relative mx-auto -ml-2 md:-ml-4"
          style={{ boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)' }}
          animate={{ rotate: isGrabbing ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-radial from-purple-500 to-purple-900"
              animate={{
                boxShadow: isGrabbing
                  ? '0 0 30px rgba(168, 85, 247, 0.9), 0 0 60px rgba(168, 85, 247, 0.6)'
                  : '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'
              }}
            />
          </div>
        </motion.div>

        {/* Lower Arm */}
        <motion.div
          className="w-14 md:w-20 h-24 md:h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg relative mx-auto mt-[-8px] overflow-hidden"
          style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
          animate={{ rotate: isGrabbing ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tech Details */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(6, 182, 212, 0.3) 3px, rgba(6, 182, 212, 0.3) 6px)'
            }}/>
          </div>
        </motion.div>

        {/* Claw Fingers */}
        <div className="relative w-24 md:w-32 h-20 md:h-28 mx-auto mt-[-4px]">
          {/* Left Finger */}
          <motion.div
            className="absolute left-0 w-6 md:w-8 h-16 md:h-24 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg"
            style={{
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
            }}
            animate={{
              rotate: isGrabbing ? 25 : 10,
              x: isGrabbing ? 20 : 10
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-8 md:h-12 bg-gradient-to-t from-purple-600 to-purple-800 rounded-b-lg opacity-80"
              animate={{
                boxShadow: isGrabbing
                  ? '0 0 20px rgba(168, 85, 247, 0.9), 0 0 40px rgba(168, 85, 247, 0.6)'
                  : '0 0 15px rgba(168, 85, 247, 0.5)'
              }}
            />
          </motion.div>

          {/* Right Finger */}
          <motion.div
            className="absolute right-0 w-6 md:w-8 h-16 md:h-24 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg"
            style={{
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
            }}
            animate={{
              rotate: isGrabbing ? -25 : -10,
              x: isGrabbing ? -20 : -10
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-8 md:h-12 bg-gradient-to-t from-purple-600 to-purple-800 rounded-b-lg opacity-80"
              animate={{
                boxShadow: isGrabbing
                  ? '0 0 20px rgba(168, 85, 247, 0.9), 0 0 40px rgba(168, 85, 247, 0.6)'
                  : '0 0 15px rgba(168, 85, 247, 0.5)'
              }}
            />
          </motion.div>

          {/* Center Finger */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-5 md:w-7 h-14 md:h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg"
            animate={{
              y: isGrabbing ? 10 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-6 md:h-10 bg-gradient-to-t from-cyan-500 to-cyan-700 rounded-b-lg opacity-80"
              animate={{
                boxShadow: isGrabbing
                  ? '0 0 20px rgba(6, 182, 212, 0.9), 0 0 40px rgba(6, 182, 212, 0.6)'
                  : '0 0 15px rgba(6, 182, 212, 0.5)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ConvergenceEngine() {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Chaos icons with their initial positions
  const chaosIcons = [
    { id: 'whatsapp', component: WhatsAppIcon, initialX: -150, initialY: -80, delay: 0 },
    { id: 'retail', component: RetailIcon, initialX: 150, initialY: -60, delay: 0.2 },
    { id: 'service', component: ServiceIcon, initialX: -180, initialY: 60, delay: 0.4 },
    { id: 'saas', component: SaaSIcon, initialX: 180, initialY: 80, delay: 0.6 },
    { id: 'payment', component: PaymentIcon, initialX: 0, initialY: 150, delay: 0.8 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGrabbing(true);
      setTimeout(() => setIsHolding(true), 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-reset animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHolding(false);
      setTimeout(() => setIsGrabbing(false), 600);
      setTimeout(() => setIsGrabbing(true), 2000);
      setTimeout(() => setIsHolding(true), 2600);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 50%, #000000 100%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Ambient Glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isGrabbing
            ? 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)'
        }}
      />

      {/* Chaos Icons */}
      <AnimatePresence>
        {!isHolding && chaosIcons.map((icon, index) => (
          <motion.div
            key={icon.id}
            className="absolute"
            initial={{
              x: icon.initialX,
              y: icon.initialY,
              opacity: 0,
              rotate: 0
            }}
            animate={{
              x: isGrabbing
                ? 0
                : icon.initialX + Math.sin(Date.now() / 1000 + index) * 20,
              y: isGrabbing
                ? 0
                : icon.initialY + Math.cos(Date.now() / 1000 + index) * 20,
              opacity: isGrabbing ? 0 : 1,
              rotate: isGrabbing ? 360 : index * 45,
              scale: isGrabbing ? 0 : 1
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: isGrabbing ? 0.6 : 0.3,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
            }}
          >
            <icon.component />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Central Glow Receptacle */}
      <motion.div
        className="absolute z-10"
        animate={{
          scale: isGrabbing ? [1, 1.2, 1] : 1,
          opacity: isGrabbing ? [0.5, 1, 0.5] : 0.3
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          boxShadow: isGrabbing
            ? '0 0 60px rgba(6, 182, 212, 0.6), 0 0 100px rgba(168, 85, 247, 0.4)'
            : '0 0 30px rgba(6, 182, 212, 0.3)'
        }}
      />

      {/* Robotic Claw */}
      <div className="relative z-20 -mt-20 md:-mt-32">
        <RoboticClaw isGrabbing={isGrabbing} isHolding={isHolding} />
      </div>

      {/* Unified Core (Data Cube) */}
      <AnimatePresence>
        {isHolding && (
          <motion.div
            className="absolute z-30"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            style={{
              marginTop: '180px'
            }}
          >
            <motion.div
              animate={{
                rotateY: 360,
                rotateX: 180
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <DataCubeIcon />
            </motion.div>
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(6, 182, 212, 0.5)',
                  '0 0 50px rgba(6, 182, 212, 0.8)',
                  '0 0 30px rgba(6, 182, 212, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-cyan-900/20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: 0
            }}
            animate={{
              y: -400,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* CSS for Grid Animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }
      `}</style>
    </div>
  );
}
