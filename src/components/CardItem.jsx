
const CardItem = ({data,clicked}) => {
    return (
        <div onClick = {clicked} style = {{padding:'0px',cursor:'pointer',transition:'all ease .3s '}} className = {data.active ? 'active' : ''} ><img 
        src= {data.src} height = '120px'alt= {data.name} style = {{borderRadius:'15px',marginBottom:'5px'}} />
        <div  style = {{fontWeight:'500',textAlign:'center'}}>{data.name}</div>
        </div>
    )
}
export default CardItem
