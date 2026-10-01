import React from 'react';

export const StoryCornerCrosses: React.FC = () => {
  return (
    <div className="site-corner-crosses" aria-hidden="true">
      <span className="site-corner-cross site-corner-cross-tl" />
      <span className="site-corner-cross site-corner-cross-tr" />
      <span className="site-corner-cross site-corner-cross-tc" />
      <span className="site-corner-cross site-corner-cross-bl" />
      <span className="site-corner-cross site-corner-cross-br" />
      <span className="site-corner-cross site-corner-cross-bc" />
    </div>
  );
};
