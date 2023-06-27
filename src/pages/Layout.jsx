import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { useState } from 'react';
import Switch from 'react-switch';

const Layout = () => {
    const [theme, setTheme] = useState('light');
    const onChangeTheme = () => {
        setTheme((currTheme) => (currTheme === 'light' ? 'dark' : 'light'));
    };
    return (
        <>
            <MainNavigation theme={theme}>
                <label htmlFor='material-switch'>
                    <span>Light </span>
                    <Switch
                        onChange={onChangeTheme}
                        checked={theme === 'dark'}
                        className='react-switch'
                        onColor='#86d3ff'
                        onHandleColor='#2693e6'
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                        activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                        height={20}
                        width={48}
                        id='material-switch'
                    />
                    <span>Dark</span>
                </label>
            </MainNavigation>
            <main id={theme}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
