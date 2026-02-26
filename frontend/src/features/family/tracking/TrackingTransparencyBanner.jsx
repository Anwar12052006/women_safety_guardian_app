export default function TrackingTransparencyBanner({ isTracking }) {
  if (!isTracking) return null;

  return (
    <div className="bg-indigo-600 p-4 rounded-xl text-center font-medium">
      Your family is currently tracking this user's live location.
    </div>
  );
}