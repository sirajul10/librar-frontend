import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseUrl";
import toast from "react-hot-toast";

const MyReserved = () => {
  const { accessToken } = useContext(AuthContext);
  const [myreserve, setMyreserve] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCancel = async (id) => {
    const res = await fetch(`${baseurl}/reserve/cancel/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resdata = await res.json();
    if(resdata){
        toast.success(resdata.message);
        fetchreservationapi();
    }
 
  };

  const fetchreservationapi = () => {
    fetch(`${baseurl}/reserve/my`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch reservations");
        }
        return res.json();
      })
      .then((data) => setMyreserve(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchreservationapi();
  }, [accessToken]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";

      case "pending":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";

      case "cancelled":
      case "canceled":
        return "bg-red-50 text-red-700 ring-red-600/20";

      case "completed":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";

      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };

  const getStatusDot = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-500";

      case "pending":
        return "bg-amber-500";

      case "cancelled":
      case "canceled":
        return "bg-red-500";

      case "completed":
        return "bg-blue-500";

      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-indigo-600">
              ACCOUNT
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              My Reservations
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Keep track of your bookings and reservation status.
            </p>
          </div>

          {/* Reservation count */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">
              📚
            </div>

            <div>
              <p className="text-xl font-bold text-slate-900">
                {myreserve.length}
              </p>

              <p className="text-xs text-slate-500">Reservations</p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading your reservations...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && myreserve.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
              📅
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-900">
              No reservations yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You don't have any reservations at the moment. Your bookings will
              appear here once you make one.
            </p>

            <button className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              Browse Books
            </button>
          </div>
        )}

        {/* Reservation list */}
        {!loading && myreserve.length > 0 && (
          <div className="space-y-5">
            {myreserve.map((reservation) => (
              <div
                key={reservation.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card top */}
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition group-hover:scale-105">
                      📚
                    </div>

                    <div>
                      <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400">
                        RESERVATION
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-slate-900">
                        #{String(reservation.id).padStart(4, "0")}
                      </h2>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusStyle(
                      reservation.status,
                    )}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
                        reservation.status,
                      )}`}
                    />

                    {reservation.status}
                  </span>
                </div>

                {/* Divider */}
                <div className="mx-5 border-t border-slate-100 sm:mx-6" />

                {/* Information */}
                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
                  {/* Book ID */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg ring-1 ring-slate-200">
                      📖
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Book ID
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        #{reservation.book_id}
                      </p>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg ring-1 ring-slate-200">
                      👤
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        User ID
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        #{reservation.user_id}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg ring-1 ring-slate-200">
                      📅
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Reserved On
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {formatDate(reservation.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg ring-1 ring-slate-200">
                      🕐
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Time
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {formatTime(reservation.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-xs text-slate-400">
                    Reservation ID: #{reservation.id}
                  </p>

                  <button
                    onClick={() => handleCancel(reservation.id)}
                    className="group/button inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-800"
                  >
                    Cancel
                    <span className="transition-transform group-hover/button:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReserved;
