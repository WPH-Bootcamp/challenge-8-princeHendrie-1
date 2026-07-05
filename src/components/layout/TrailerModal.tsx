import React from 'react';

interface TrailerModalProps {
  videoKey: string;
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ videoKey, onClose }) => {
  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in'
      onClick={onClose} // Klik di luar area video untuk menutup
    >
      <div
        className='relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl'
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika area video diklik
      >
        {/* Tombol Tutup (X) */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-50 bg-black/50 hover:bg-black p-2 rounded-full text-white/80 hover:text-white transition'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Pemutar Video YouTube Iframe */}
        <iframe
          className='w-full h-full'
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&modestbranding=1`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
