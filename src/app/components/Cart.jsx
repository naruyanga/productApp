

const Cart=({thumbnail,title,price,id,rate})=>{
return (<div className="container">
    <div>
      <img style={{height:"150px"}} src={thumbnail}/>
    </div>
    <div className="box">
      <div >{title}</div>
      <div>id:{id}</div>
      <div>rating:{rate}</div>
      <div style={{fontSize:"20px",fontWeight:"bold"}}>price:{price}</div>
    </div>
</div>)
}
export default Cart;