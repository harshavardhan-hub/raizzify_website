'use client';

import { useModal } from './ModalContext';

export default function WhatsAppButton() {
  const { openModal } = useModal();

  return (
    <button
      onClick={openModal}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[99] bg-[#25D366] hover:bg-[#20bd5a] text-white p-[14px] md:p-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group border-2 border-white/20 cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-8 h-8 md:w-9 md:h-9 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 0C5.385 0 .001 5.384.001 12.031c0 2.12.551 4.195 1.597 6.015L.031 24l6.096-1.598c1.785.955 3.791 1.458 5.901 1.458 6.648 0 12.033-5.385 12.033-12.033S18.679 0 12.031 0zm0 21.905c-1.846 0-3.655-.497-5.242-1.439l-.376-.223-3.896 1.021 1.039-3.798-.245-.39A9.972 9.972 0 0 1 2.062 12.03c0-5.503 4.476-9.978 9.97-9.978 5.501 0 9.974 4.475 9.974 9.978s-4.473 9.975-9.975 9.975zm5.459-7.447c-.299-.15-1.77-.874-2.044-.974-.275-.1-.476-.15-.675.15-.2.3-.775.975-.95.117-.175.2-.35.225-.65.075-.3-.15-1.264-.466-2.408-1.488-.888-.795-1.49-1.777-1.665-2.077-.175-.3-.018-.462.131-.611.135-.134.3-.349.45-.524.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.514h-.575c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.226 5.113 4.526.715.308 1.272.492 1.706.63.716.228 1.37.195 1.884.118.577-.087 1.77-.723 2.02-1.423.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
      </svg>
      {/* Tooltip on hover (desktop only) */}
      <span className="absolute right-full mr-4 bg-zinc-900 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block shadow-lg pointer-events-none border border-white/10 translate-x-4 group-hover:translate-x-0 font-medium">
        Chat with us!
      </span>
    </button>
  );
}
