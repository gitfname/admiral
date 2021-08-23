import React from 'react'
import styles from '../Layout.module.scss'
import { useNav } from '@/src/context/NavContext'
import { useTheme } from '@/admiral/theme'
import cn from 'classnames'

const LayoutAside: React.FC = ({ children }) => {
    const { themeName } = useTheme()
    const { visible, toggle, collapsed } = useNav()

    return (
        <>
            <div className={cn(styles.panel_Content)}>{children}</div>

            <div className={cn(styles.modal, { [styles.modal__Visible]: visible })}>
                <div className={styles.modal_Layout}>
                    <div className={styles.modal_Inner}>{children}</div>
                </div>
            </div>
        </>
    )
}

export default LayoutAside
