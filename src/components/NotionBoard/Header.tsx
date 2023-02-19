import React from 'react';

const Header = () => {
  return (
    <div className='flex flex-col gap-3 p-10 lg:p-28 break-words'>
      <h1>Notion Board</h1>
      <p>
        Drag and drop tasks from one column to another. This is a simple example
        of a Notion board using React and Tailwind CSS. This uses the Drag and
        Drop API.{' '}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API'
          rel='noreferrer'
          target='_blank'
        >
          (Read more here 👉
          https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
        </a>
      </p>
    </div>
  );
};

export default Header;
