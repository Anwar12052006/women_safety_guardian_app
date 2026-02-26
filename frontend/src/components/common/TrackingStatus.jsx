import React, { useEffect, useState }
from "react";

import { getTrackingStatus }
from "../../services/trackingService";

export default function TrackingStatus({ userId })
{
 const [trackers,
 setTrackers] = useState([]);

 useEffect(() =>
 {
   load();
 }, []);

 const load =
 async () =>
 {
   const res =
   await getTrackingStatus(userId);

   setTrackers(res.data.trackers);
 };

 return (
 <div className="bg-white rounded-xl p-4 shadow">

 <h3 className="font-semibold mb-2">
 Tracking Status
 </h3>

 {
 trackers.length === 0 ?
 (
 <p className="text-gray-500">
 No one tracking yet
 </p>
 )
 :
 trackers.map((t, i) => (
 <div key={i}
 className="text-sm text-green-600">
 {t.name} is tracking you
 </div>
 ))
 }

 </div>
 );
}
