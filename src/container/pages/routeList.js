// import React from 'react';
// import UilMapMarker from '@iconscout/react-unicons/icons/uil-map-marker';
// import UilClock from '@iconscout/react-unicons/icons/uil-clock';
// import { Link } from 'react-router-dom';
// import { Card, Col } from 'antd';
// import propTypes from 'prop-types';
// import { CourseCardWrap } from '../../components/cards/Style';
//
// function routeList({ mapList }) {
//   console.log(mapList);
//   const { mapNo, courseName, courseDetail, addr, distance, time } = mapList;
//
//   return (
//     <Col xxl={6} lg={8} sm={12} xs={24}>
//       <CourseCardWrap className="ninjadash-course-card-single">
//         <Card bordered={false}>
//           <div className="ninjadash-course-card-thumbnail">
//             <img src={require(``)} alt="ninjaDash" />
//           </div>
//           <div className="ninjadash-course-card-content">
//             <h4 className="ninjadash-course-card-title">
//               <Link to={``}>{courseName}</Link>
//             </h4>
//             <div className="ninjadash-course-card-author">
//               <span className="ninjadash-course-card-author__name">{courseDetail}</span>
//             </div>
//             <div className="ninjadash-course-card-meta">
//               <div className="ninjadash-course-card-meta__left">
//                 <span className="ninjadash-course-card-meta__pricing">{distance}Km</span>
//               </div>
//               <ul className="ninjadash-course-card-meta__right">
//                 <li className="bg-secondary">
//                   <UilMapMarker />
//                   <span>{addr}</span>
//                 </li>
//                 <li className="bg-primary">
//                   <UilClock />
//                   <span>{time} Hrs</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </Card>
//       </CourseCardWrap>
//     </Col>
//   );
// }
// routeList.propTypes = {
//   mapList: propTypes.object,
// };
// export default routeList;
