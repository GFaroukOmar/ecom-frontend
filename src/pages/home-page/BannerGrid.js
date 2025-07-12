import {Heading} from "../../components/in-components-reuseable-components/TypographyComponents";
import {Link} from "../../components/in-components-reuseable-components/TypographyComponents";
import {useEffect, useState} from "react";

import GoToLinkUnderlined from "../../components/in-components-reuseable-components/GoToLinkUnderlined";

const cards={
    card1:{category: "Kitchen", link: "/shop", image: "/images/home-page/living-room.jpg"},
    card2:{category: "Phones", link: "/shop", image: "/images/home-page/bed-room.jpg"},
    card3:{category: "Laptops", link: "/shop", image: "/images/home-page/kitchen.jpg"}
}

const BannerGrid=()=>{

    const [canHoldSmallCards,setCanHoldSmallCards]=useState(window.innerWidth>1000)
    useEffect(() => {
        const handleResize=()=> {
            setCanHoldSmallCards(window.innerWidth>1000)
        };
        window.addEventListener('resize',handleResize)
        return ()=>{window.removeEventListener('resize', handleResize);
        }
    }, []);
    const BigCard=()=>{
        const background=cards.card1.image
        const backgroundStyle = {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundColor: 'lightgray',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'multiply',
            backgroundSize:'100%',
        };

        if (!canHoldSmallCards) {
            backgroundStyle.height ='311px'
            backgroundStyle.width ='100%'
        }
        else{backgroundStyle.height='564px';backgroundStyle.width='50%'}
        const link=cards.card1.link;
        return(
            <div className={"container p-lg-5 p-2 d-flex flex-column justify-content-lg-start justify-content-end"}
                 style={backgroundStyle}>
                <Link className={"d-flex justify-content-start"} to={link}>
                    <Heading level={6}>
                        {cards.card1.category}
                    </Heading>
                </Link>
                <GoToLinkUnderlined>Shop Now</GoToLinkUnderlined>
            </div>
        )
    }
    const SmallCard = ({card}) => {
        const background=card.image
        const backgroundStyle = {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'right',
            backgroundColor: 'lightgray',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'multiply',
            backgroundSize:'60%',
            height:'274px',
        }
        return(
            <div style={backgroundStyle} className={"container d-flex flex-column justify-content-end"}>
                <div >
                    <Link className={"d-flex justify-content-start"} to={card.link}>
                        <Heading level={6}>
                            {card.category}
                        </Heading>
                    </Link>
                    <GoToLinkUnderlined>Shop Now</GoToLinkUnderlined>
                </div>
            </div>
        )
    }

    let smallCardsContainerWidth;
    if(canHoldSmallCards) smallCardsContainerWidth="50%"
    else smallCardsContainerWidth='100%'
    return(
        <div className={'mt-4 gap-3 container d-flex flex-column flex-lg-row align-items-lg-center'}>
            <BigCard />
            <div style={{width:smallCardsContainerWidth}} className={"d-flex gap-3 h-100 flex-column"}>
                <SmallCard card={cards.card2}/>
                <SmallCard card={cards.card3}/>
            </div>
        </div>
    )
}
export default BannerGrid