'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © {currentYear}{" "}
          <a 
            href="https://eduhub254.com" 
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OCHIENG™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  );
};

export default Footer;