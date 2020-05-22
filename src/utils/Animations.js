import gsap from 'gsap'

export const modalReveal = (item1, item2, item3) => {

    gsap.to([item1, item2, item3],{
        duration: .8,
        opacity: 1,
        y: -20,
        ease: 'power3.easeOut',
        stagger: {
            amount: 0.3
        }
    })
    
}

export const lineGrowth = (line1, line2, line3, item1, item2, item3) => {

    gsap.to([line1, line2, line3, item1, item2, item3],{
        duration: 0.8,
        opacity: 1,
        width: 285,
        ease: 'power3.easeOut',
        stagger:{
            amount: 0.9
        }
    })
}

export const leftToRightReveal = (item1, xQty, opac) => {

    gsap.to(item1,{
        duration: 0.8,
        opacity:opac,
        x: xQty,
        ease: 'power3.easeOut'
    })
}


export const addMargin = (item1, item2, item3) => {
    gsap.to([item1, item2, item3],{
        duration:0.2,
        opacity: 1,
        marginTop:1+'rem' 
    })
}
export const shrinkMargin = (item1, item2, item3) => {
    gsap.to([item1, item2, item3],{
        duration:0.2,
        opacity: 0.5,
        marginTop:0
    })
}