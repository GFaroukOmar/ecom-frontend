import {useState} from "react";
import {Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import {FilterIcon} from "../../components/in-components-reuseable-components/Icons";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


const CategoriesSelect=({active,categories,updateCurrentCategory})=> {
    const handleSelection=(event,value)=>{
            updateCurrentCategory(value)
    }
        const categoriesOptions=categories.map(category=> <Option value={category}>{category}</Option>)
    return (
        <Select
            defaultValue={active}
            indicator={<KeyboardArrowDown />}
            onChange={handleSelection}
            sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                    transition: '0.5s',
                    [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                    },
                },
                backgroundColor:'white',
                border:'solid black 2px'
            }}
        >
            {categoriesOptions}
        </Select>
    );
}
const PriceRangeSelect=({active,priceRanges,updateCurrentPriceRange})=> {
    const handleSelection=(event,value)=>{
            if(updateCurrentPriceRange)updateCurrentPriceRange(value)
    }
        const priceRangesOptions=priceRanges.map(priceRange=> <Option value={priceRange}>{priceRange}</Option>)
    return (
        <Select
            defaultValue={active}
            indicator={<KeyboardArrowDown />}
            onChange={handleSelection}
            sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                    transition: '0.5s',
                    [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                    },
                },
                backgroundColor:'white',
                border:'solid black 2px'
            }}
        >
            {priceRangesOptions}
        </Select>
    );
}


const CategoriesList = ({updateCurrentCategory,categories=[],active=''}) => {
    const [activeCategory, setActiveCategory] = useState(active)
    const handleCategoryClick=(category)=>{
        updateCurrentCategory(category)
        setActiveCategory(category)
    }
    // search for active category index and save it
    // map for each category given a text styled text tag and on click execute
    // the function updateCurrentCategory
    const activeCategoryIndex=categories.findIndex(category=>category===activeCategory)
    const categoriesComponents=categories.map(category=>
        <div  className={'pointer-cursor'} onClick={()=>handleCategoryClick(category)}>
            <Text size={14} weight={'SemiBald'} color={'neutral-05'}>
                {category}
            </Text>
        </div>
    )
    // go to  the index of the active category and set an underline to it
    categoriesComponents[activeCategoryIndex]=
        <div className={'pointer-cursor'}>
            <Text size={14} weight={'SemiBald'} style={{borderBottom:'solid black 2px'}}>
                {activeCategory}
            </Text>
        </div>
    // return the categories components
    return(
        <div className={'d-flex flex-column align-items-start'} style={{gap:'12px'}}>
            <Text  size={16} weight={'SemiBald'}>Categories</Text>
            {categoriesComponents}
        </div>
    )
}
const PriceList=({updateCurrentPriceRange,priceRanges = [],active=''})=>{
    const [activePriceRange, setActivePriceRange] = useState(active)
    const handleCategoryClick=(category)=>{
        // when the state updated it research for the active and redo the process
        updateCurrentPriceRange(category)
        setActivePriceRange(category)
    }
    // search for the active price range index and save it
    // map for each price range given a text styled text tag and on click execute
    // the function updateCurrentCategory
    const activePriceRangeIndex=priceRanges.findIndex(priceRange=>priceRange===activePriceRange)
    const priceRangesComponents=priceRanges.map(priceRange=>
        <div  className={'pointer-cursor'} onClick={()=>handleCategoryClick(priceRange)}>
            <Text size={14} weight={'SemiBald'} color={'neutral-05'}>
                {`$${priceRange}`}
            </Text>
        </div>
    )
    // go to  the index of the active category and set an underline to it
    priceRangesComponents[activePriceRangeIndex]=
        <div className={'pointer-cursor'}>
            <Text size={14} weight={'SemiBald'} style={{borderBottom:'solid black 2px'}}>
                {`$${activePriceRange}`}
            </Text>
        </div>
    // return the categories components
    return(
        <div className={'d-flex flex-column align-items-start'} style={{gap:'12px'}}>
            <Text  size={16} weight={'SemiBald'}>Prices</Text>
            {priceRangesComponents}
        </div>
    )
}
const FilterArea = ({updateCurrentCategory,updateCurrentPriceRange,type}) => {
    if (type===1)
        return (
            <div style={{gap:'16px'}} class={'d-flex flex-column align-items-start'}>
                <div className={'d-flex align-items-center'} style={{gap:'8px'}}>
                    <FilterIcon/>
                    <Text size={20} weight={'SemiBald'}>Filter</Text>
                </div>
                <CategoriesList updateCurrentCategory={updateCurrentCategory} active={'Living Room'} categories={['Living Room','Bath Room','Garage','Kitchen']}/>
                <PriceList active={'All Prices'} priceRanges={['All Prices',100,200,300]} updateCurrentPriceRange={updateCurrentPriceRange}/>
            </div>)
    else if(type===2)
        return (
            <div style={{gap:'24px'}} className={'d-flex'}>
                <CategoriesSelect updateCurrentCategory={updateCurrentCategory} active={'Living Room'}  categories={['Living Room','Bath Room','Garage','Kitchen']}/>
                <PriceRangeSelect updateCurrentPriceRange={updateCurrentPriceRange} active={'All Prices'}  priceRanges={['All Prices','100','200','300']}/>
            </div>
        )
    else
        return (
            <div style={{gap:'24px'}} className={'d-flex flex-column'}>
                <CategoriesSelect updateCurrentCategory={updateCurrentCategory} active={'Living Room'}  categories={['Living Room','Bath Room','Garage','Kitchen']}/>
                <PriceRangeSelect updateCurrentPriceRange={updateCurrentPriceRange} active={'All Prices'}  priceRanges={['All Prices','100','200','300']}/>
            </div>
        )

}
export default FilterArea