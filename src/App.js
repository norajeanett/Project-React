import React, { useState } from 'react';
import classes from './App.module.css';
import { Navigation } from './Navigation';
import Schools from './Schools';
import SchoolInfo from './SchoolInfo';
import NewInspection from './NewInspection';
import NewSchool from './NewSchool';

function MyApp() {
  const [activePage, setActivePage] = useState('Schools');
  const [activeId, setActiveId] = useState(1);

  const activePageHandler = (page) => {
    setActivePage(page);
  };

  const activeIdHandler = (id) => {
	setActiveId(id);
  };


  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Navigation
          activePage={activePage}
          activePageHandler={activePageHandler}
        />
      </div>
      <div className={classes.right}>
        {activePage === 'Schools' && <Schools activePage={activePage} activePageHandler={activePageHandler} activeIdHandler={activeIdHandler} id={activeId} />}
		    {activePage === 'SchoolInfo' && <SchoolInfo id={activeId} activePage={activePage} activePageHandler={activePageHandler} />}
        {activePage === 'NewInspection' && <NewInspection />}
        {activePage === 'NewSchool' && <NewSchool />}
      </div>
    </div>
  );
}

export default MyApp;
