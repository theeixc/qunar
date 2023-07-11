import "./Footer.scss"
import { RiMoneyCnyCircleLine, RiArrowUpDownLine } from 'react-icons/ri'
import { BiFilterAlt, BiTime } from 'react-icons/bi'
import { TbArrowNarrowUp } from 'react-icons/tb'
import { useEffect, useRef } from 'react'

const Footer = ({ footerShow, sort, setSort }) => {

  const footerRef = useRef(null);

  // 筛选
  const handle0Click = () => {
    // setSort(6)
    alert("暂未实现")
  }

  // 推荐排序
  const handle1Click = () => {
    setSort(5);
  }

  // 时间
  const handle2Click = () => {
    sort === 3 ? setSort(4) : setSort(3)
  }

  // 价格
  const handle3Click = () => {
    sort === 1 ? setSort(2) : setSort(1)
  }


  /* useEffect(() => {
    footerShow ? footerRef.current.classList.remove('hidebar') : footerRef.current.classList.add('hidebar')
  }, [footerShow]) */
  return (
    <div>
      <div className="app__footer-goTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="goTop-topLine"></div>
        <div className="goTop-arrow"><TbArrowNarrowUp /></div>
        <span>顶部</span>
      </div>
      <footer ref={footerRef} className={["app__footer-container", !footerShow ? 'hidebar' : ""].join(" ")}>
        <div className={["app__footer-item", sort === 6 ? "footer-item-active" : ""].join(" ")} onClick={handle0Click}>
          <BiFilterAlt />
          <span>筛选</span>
        </div>
        <div className={["app__footer-item", sort === 5 ? "footer-item-active" : ""].join(" ")} onClick={handle1Click}>
          <RiArrowUpDownLine />
          <span>推荐排序</span>
        </div>
        <div className={["app__footer-item", (sort === 3 || sort === 4) ? "footer-item-active" : ""].join(" ")} onClick={handle2Click}>
          <BiTime />
          <span>{sort !== 3 && sort !== 4 ? "时间" : sort === 3 ? "从早到晚" : "从晚到早"}</span>
        </div>
        <div className={["app__footer-item", (sort === 1 || sort === 2) ? "footer-item-active" : ""].join(" ")} onClick={handle3Click}>
          <RiMoneyCnyCircleLine />
          <span>{sort !== 1 && sort !== 2 ? "价格" : sort === 1 ? "从低到高" : "从高到低"}</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer