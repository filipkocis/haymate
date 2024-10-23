import { useParams } from "react-router-dom";
import MatchCard from "../match/components/MatchCard";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Profile() {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/api/profile?id=${userId}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err))
  }, [userId])

  if (!profile) return <Loader />

  return (
    <div className="animate-fade-in-page relative flex flex-col sm:grid grid-rows-[1fr,auto] justify-between sm:justify-center sm:px-6 pt-2 sm:pt-6 overflow-hidden">
      <MatchCard profile={profile} />
    </div>
  )
}
