import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Discoverpage.scss';
import Header from '../Header/Header';
import { useLazyQuery, useQuery } from '@apollo/client';
import { queryDiscoverData, getSearchQuestion } from '../../../utility/query';
import Countdown from 'react-countdown';

function Discoverpage() {
  let navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('ACTIVE');
  const [discoverInfo, setDiscoverInfo] = useState([]);
  const [userSearchValue, setUserSearchValue] = useState('');
  const [allData, setAllData] = useState([]);

  const { data: discoverData } = useQuery(queryDiscoverData);

  const inputElement = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [getSearchResultfromQuery, { data: searchResult }] = useLazyQuery(
    getSearchQuestion(userSearchValue.split(' ').join(' | '))
  );

  const handleSearch = () => {
    if (inputElement.current.value.length != 0) {
      getSearchResultfromQuery();
    } else {
      alert('InValid Search');
    }
  };

  
  useEffect(() => {
    // let btn = document.getElementById('btn-click')as HTMLInputElement | null;
    document.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        if(inputElement.current.value.trimStart() == ''){
           alert('Invalid Search');
           inputElement.current.value = inputElement.current.value.trimStart();
        }else{
          getSearchResultfromQuery();
        }
        
      }
    });
  }, []);

  //First Query Call
  useEffect(() => {
    setAllData(discoverData?.questions);
    if (discoverData) {
      let now = new Date();
      let active: any = [];
      let upcoming: any = [];
      let ended: any = [];
      discoverData?.questions.forEach(
        (bounty: { startTimestamp: string; endTimestamp: string }) => {
          let startDate = new Date(Number(bounty?.startTimestamp) * 1000);
          let endDate = new Date(Number(bounty?.endTimestamp) * 1000);
          if (startDate < now && endDate > now) {
            active.push(bounty);
          }
          if (startDate > now) {
            upcoming.push(bounty);
          }
          if (now > startDate && now > endDate) {
            ended.push(bounty);
          }
        }
      );
      if (active.length == 0) {
        if (upcoming.length == 0) {
          setDiscoverInfo(ended);
          setCurrentTab('ENDED');
        } else {
          setDiscoverInfo(upcoming);
          setCurrentTab('UPCOMING');
        }
      } else {
        setDiscoverInfo(active);
      }
    }
  }, [discoverData]);

  //Search Result UseEffect
  useEffect(() => {
    if (searchResult) {
      setAllData(searchResult?.questions);
      if (searchResult) {
        let now = new Date();
        let active: any = [];
        let upcoming: any = [];
        let ended: any = [];
        searchResult?.questions.forEach(
          (bounty: { startTimestamp: string; endTimestamp: string }) => {
            let startDate = new Date(Number(bounty?.startTimestamp) * 1000);
            let endDate = new Date(Number(bounty?.endTimestamp) * 1000);
            if (startDate < now && endDate > now) {
              active.push(bounty);
            }
            if (startDate > now) {
              upcoming.push(bounty);
            }
            if (now > startDate && now > endDate) {
              ended.push(bounty);
            }
          }
        );
        if (active.length == 0) {
          if (upcoming.length == 0) {
            setDiscoverInfo(ended);
            setCurrentTab('ENDED');
          } else {
            setDiscoverInfo(upcoming);
            setCurrentTab('UPCOMING');
          }
        } else {
          setDiscoverInfo(active);
          setCurrentTab('ACTIVE');
        }
      }
    }
  }, [searchResult]);

  //ON Tab change apply filter function
  const changeTab = (tab: any) => {
    let now = new Date();
    if (tab == 'UPCOMING') {
      let upcoming: any = [];
      allData.forEach((bounty: { startTimestamp: string }) => {
        let startDate = new Date(Number(bounty?.startTimestamp) * 1000);

        if (startDate > now) {
          upcoming.push(bounty);
        }
      });
      setDiscoverInfo(upcoming);
      setCurrentTab(tab);
    } else if (tab == 'ENDED') {
      let ended: any = [];
      allData.forEach((bounty: { startTimestamp: string; endTimestamp: string }) => {
        let startDate = new Date(Number(bounty?.startTimestamp) * 1000);
        let endDate = new Date(Number(bounty?.endTimestamp) * 1000);
        if (startDate < now && endDate < now) {
          ended.push(bounty);
        }
      });
      setDiscoverInfo(ended);
      setCurrentTab(tab);
    } else if (tab == 'ACTIVE') {
      let active: any = [];
      allData.forEach((bounty: { startTimestamp: string; endTimestamp: string }) => {
        let startDate = new Date(Number(bounty?.startTimestamp) * 1000);
        let endDate = new Date(Number(bounty?.endTimestamp) * 1000);
        if (startDate < now && endDate > now) {
          active.push(bounty);
        }
      });
      setDiscoverInfo(active);
      setCurrentTab(tab);
    }
  };

  useEffect(() => {}, [currentTab]);

  const navigateToQuestionDetailsPage = (hash: string) => {
    navigate(`/question-details/${hash}`);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="discover-page-wrapper">
        <div className="discover-page-heading-wrapper">
          <div className="discover-background-image">
            <svg
              width="410"
              height="99"
              viewBox="0 0 410 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_b_2672_4614)">
                <path
                  d="M409.328 39.1513C409.726 63.3127 390.476 83.7266 366.333 84.7469L35.0119 98.7492C16.4403 99.5341 1.13699 85.1037 0.83113 66.5179C0.372335 38.6394 22.5834 15.0849 50.4408 13.9076L368.311 0.473732C390.597 -0.46812 408.961 16.8484 409.328 39.1513Z"
                  fill="white"
                  fill-opacity="0.08"
                />
              </g>
              <defs>
                <filter
                  id="filter0_b_2672_4614"
                  x="-47.1758"
                  y="-47.5625"
                  width="504.51"
                  height="194.342"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="24" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_2672_4614"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_2672_4614"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <img className="discover-page-header-image" src="././discoverHeaderImage.png" alt="" />
            <div className="discover-heading-text">Questions</div>
          </div>
        </div>
        <div className="discover-questions-section">
          {/* tabs component */}
          <div className="discover-tabs-section-wrapper">
            <div className="discover-question-search-bar">
              <ul>
                <li
                  className={currentTab == 'ACTIVE' ? 'active-tab' : ''}
                  onClick={() => changeTab('ACTIVE')}
                >
                  Active
                </li>
                <li
                  className={currentTab == 'UPCOMING' ? 'active-tab' : ''}
                  onClick={() => changeTab('UPCOMING')}
                >
                  Upcoming
                </li>
                <li
                  className={currentTab == 'ENDED' ? 'active-tab' : ''}
                  onClick={() => changeTab('ENDED')}
                >
                  Ended
                </li>
              </ul>
              <div className="discover-question-input-bar">
                <input
                ref={inputElement}
                  value={userSearchValue}
                  onChange={(e) => setUserSearchValue(e.target.value)}
                  type="text"
                  placeholder="Search"
                />
                <button id="btn-click" className="search-btn" onClick={handleSearch}>
                  <svg
                    className="svg-icon search-icon"
                    aria-labelledby="title desc"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19.9 19.7"
                  >
                    <title id="title">Search Icon</title>
                    <desc id="desc">A magnifying glass icon.</desc>
                    <g className="search-path" fill="none" stroke="#848F91">
                      <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                      <circle cx="8" cy="8" r="7" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="discover-tabs-horizontal-line"></div>
          </div>
          {/* cards component */}
          <div className="discover-question-card-component-wrapper">
            {discoverInfo &&
              discoverInfo.map(
                (item: {
                  questionHash: string;
                  title: string;
                  description: string;
                  totalWinningAmount: string;
                  endTimestamp: string;
                  imageUrl: string | undefined;
                }) => {
                  return (
                    <div
                      className="discover-indivisual-card"
                      onClick={() => navigateToQuestionDetailsPage(item?.questionHash)}
                    >
                      <img
                        loading="lazy"
                        className="discover-card-component-image"
                        src={
                          item?.imageUrl == 'imageUrl' ? 'images/dummyimage.png' : item?.imageUrl
                        }
                        alt=""
                      />
                      <div className="discover-event-title">
                        <h2>{item?.title.slice(0, 50) + '...'}</h2>
                        <p>{item?.description.slice(0, 50) + '...'}</p>
                      </div>
                      <div className="discover-event-details">
                        <h1>${item?.totalWinningAmount}</h1>
                        <div className="discover-event-countdowntimer">
                          <p>Ends in</p>
                          <h3>
                            <Countdown date={Date.now() + parseInt(item?.endTimestamp)} />
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            {discoverInfo.length == 0 ? <h1 className="no-result-found">No result Found</h1> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Discoverpage;