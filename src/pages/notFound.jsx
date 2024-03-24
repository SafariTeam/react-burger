import { useCallback, useEffect } from 'react';
import styles from './page.module.css';
import { Link } from 'react-router-dom';

export default function NotFound () {
    const text = ['Я ошибся. Могу я один раз ошибиться?','Вот как мне с этим жить?','Я, конечно, прихерел...','Ну это пи**ец какой-то, ну сколько можно?'];
    
    return (
        <div className={styles.contentWrapper}>
            <div>
                <span className='text text_type_main-large mb-6'>404</span>
                <span className={`${styles.notFoundContent} text text_type_main-medium`}>{text[Math.floor(Math.random() * 4)]}</span>
                <span className={`${styles.notFoundContent} text text_type_main-small mt-10`}><Link to='/'>На главную</Link></span>
            </div>
        </div>
    )
}