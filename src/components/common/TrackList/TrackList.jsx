// import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiTime } from "react-icons/bi";
// import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import LikeButton from "./../../../components/common/LikeButton/LikeButton";
import MusicCardPlayButton from "../../../components/common/MusicCardPlayButton";
import GenreBlock from "./../../../components/common/GenreBlock/index";

import { selectIsPlaying } from "../../../redux/selectors";
import Tooltip from "../../../components/common/Tooltip";
import TrackListRow from "./../TrackListRow/index";
import OptionsButton from "./../OptionsButton/index";
import Separator from "../Separator";
import { setCurrentPlaylist } from "../../../redux/playlistsSlice";
import { selectHeaderBackground } from "../../../redux/selectors";
import styles from "./TrackList.module.css";
import { setHeaderBackground } from "../../../redux/defaultSlice";

const TrackList = ({ cover, blockTitle, songTitle, avatar, songsNumber }) => {
    const isPlaying = useSelector(selectIsPlaying);
    const [isSelected, setIsSelected] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [genres, setGenres] = useState([]);

    const headerBackground = useSelector(selectHeaderBackground);

    const dispatch = useDispatch();

    const URL_PLAYLISTS =
        "https://63ce4f4c6d27349c2b6afb94.mockapi.io/playlists";

    useEffect(() => {
        setIsLoading(true);
        axios.get(URL_PLAYLISTS).then((res) => {
            setGenres(res.data);
            setIsLoading(false);
        });
    }, []);

    const toggleBackground = (i) => {
        setIsSelected(i);
        setIsActive((prev) => !prev);
    };

    return (
        <div
            style={{ background: "linear-gradient(#1C1632, #121212)" }}
            className={styles.wrapper}
        >
            <div className={styles.playlistActionBtns}>
                <MusicCardPlayButton
                    icon={isPlaying ? AiFillPauseCircle : AiFillPlayCircle}
                    size="140px"
                    onClick={() => dispatch(setCurrentPlaylist({ genres }))}
                />
                <LikeButton
                    onClick={() => setIsLiked((prev) => !prev)}
                    isLiked={isLiked}
                    size="35px"
                />
                <OptionsButton />
            </div>
            <div className={styles.infoTitleBlock}>
                <div>
                    <span>#</span>
                    <span>title</span>
                </div>
                <span>album</span>
                <span>date added</span>
                <Tooltip text="duration">
                    <BiTime />
                </Tooltip>
            </div>
            <Separator margin="5px 0 20px" />
            {genres.map((genre, index) => (
                <TrackListRow
                    key={genre.id}
                    onClick={() => toggleBackground(index)}
                    isActive={isSelected === index && isActive && styles.active}
                    cover={genre.playlistImg}
                    index={index + 1}
                />
            ))}
            <Separator margin="80px 0px" />
            {/*
			<div className={styles.songData}>
				<span>August 5, 2022</span>
				<div className={styles.songCopyright}>
					<span>© 2022 FAAAYKE</span>
					<span>© 2022 FAAAYKE</span>
				</div>
			</div> */}
            {genres &&
                genres.map((genre) => (
                    <div key={genre.id}>
                        <GenreBlock
                            to="/playlist/tracks"
                            playlists={genre.playlists}
                            title={genre.title}
                            linkTitle="see discography"
                        />
                    </div>
                ))}
        </div>
    );
};

export default TrackList;
