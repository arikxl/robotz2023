import Link from 'next/link'
import React from 'react'

const DropdownLink = React.forwardRef((props, ref) => {
    let { href, children, ...rest } = props

    return (
        <Link ref={ref} {...rest} href={href}>
            {children}
        </Link>
    )
});

export default DropdownLink