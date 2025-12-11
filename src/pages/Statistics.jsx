import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { getAllStatistics, getStatisticsByPeriod } from '../api-logic/statisticsAPI.jsx';
import '../CSS/Statistics.css';

function Statistics() {
    const [allStatistics, setAllStatistics] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedMovie, setSelectedMovie] = useState('all');
    const [selectedTheater, setSelectedTheater] = useState('all');
    const [selectedAuditorium, setSelectedAuditorium] = useState('all');
    const [movieSearch, setMovieSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [auditoriums, setAuditoriums] = useState([]);

    useEffect(() => {
        loadStatistics();
    }, []);

    useEffect(() => {
        filterStatistics();
    }, [filterType, selectedYear, selectedMonth]);
    
    useEffect(() => {
        applyAdditionalFilters();
    }, [selectedMovie, selectedTheater, selectedAuditorium, allStatistics]);

    async function loadStatistics() {
        setLoading(true);
        try {
            const data = await getAllStatistics();
            setAllStatistics(data || []);
            
            const moviesMap = new Map();
            const theatersMap = new Map();
            const auditoriumsMap = new Map();
            
            data.forEach(stat => {
                if (!moviesMap.has(stat.movie_id)) {
                    moviesMap.set(stat.movie_id, { id: stat.movie_id, title: stat.movie_title });
                }
                if (!theatersMap.has(stat.theater_id)) {
                    theatersMap.set(stat.theater_id, { id: stat.theater_id, name: stat.theater_name });
                }
                if (!auditoriumsMap.has(stat.auditorium_id)) {
                    auditoriumsMap.set(stat.auditorium_id, { id: stat.auditorium_id, name: stat.auditorium_name });
                }
            });
            
            setMovies(Array.from(moviesMap.values()));
            setTheaters(Array.from(theatersMap.values()));
            setAuditoriums(Array.from(auditoriumsMap.values()));
            
            setStatistics(data || []);
        } catch (error) {
            console.error('Error loading statistics:', error);
            setAllStatistics([]);
            setStatistics([]);
        } finally {
            setLoading(false);
        }
    }

    async function filterStatistics() {
        if (filterType === 'all') {
            setAllStatistics(await getAllStatistics());
        } else if (filterType === 'month') {
            setLoading(true);
            try {
                const data = await getStatisticsByPeriod(selectedYear, selectedMonth);
                setAllStatistics(data || []);
            } catch (error) {
                console.error('Error loading filtered statistics:', error);
                setAllStatistics([]);
            } finally {
                setLoading(false);
            }
        } else if (filterType === 'year') {
            setLoading(true);
            try {
                const data = await getAllStatistics();
                const filtered = data.filter(stat => stat.report_year === selectedYear);
                setAllStatistics(filtered || []);
            } catch (error) {
                console.error('Error loading filtered statistics:', error);
                setAllStatistics([]);
            } finally {
                setLoading(false);
            }
        }
    }
    
    function applyAdditionalFilters() {
        let filtered = [...allStatistics];
        
        if (selectedMovie !== 'all') {
            filtered = filtered.filter(stat => stat.movie_id === parseInt(selectedMovie));
        }
        
        if (selectedTheater !== 'all') {
            filtered = filtered.filter(stat => stat.theater_id === parseInt(selectedTheater));
        }
        
        if (selectedAuditorium !== 'all') {
            filtered = filtered.filter(stat => stat.auditorium_id === parseInt(selectedAuditorium));
        }
        
        setStatistics(filtered);
    }

    // Combining statistics to have one line per movie
    const aggregatedStats = Object.values(
        statistics.reduce((acc, stat) => {
            const key = stat.movie_id;
            if (!acc[key]) {
                acc[key] = {
                    movie_id: stat.movie_id,
                    movie_title: stat.movie_title,
                    tickets_sold: 0,
                    total_revenue: 0,
                    periods: new Set()
                };
            }
            acc[key].tickets_sold += parseInt(stat.tickets_sold || 0);
            acc[key].total_revenue += parseInt(stat.total_revenue || 0);
            acc[key].periods.add(`${stat.report_year}-${stat.report_month}`);
            return acc;
        }, {})
    ).map(stat => ({
        ...stat,
        period_count: stat.periods.size,
        periods: Array.from(stat.periods).sort().join(', ')
    }));

    const totalRevenue = statistics.reduce((sum, stat) => sum + parseInt(stat.total_revenue || 0), 0);
    const totalTickets = statistics.reduce((sum, stat) => sum + parseInt(stat.tickets_sold || 0), 0);

    return (
        <div>
            <Navbar showLinks={true}/>
            <div className='statistics-container'>
                <h1>Statistics</h1>
                
                <div className="filter-section">
                    <div className="date-filter-row">
                        <label>Date Filter: </label>
                        <select style={{marginRight: '15px'}} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="all">All Time</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>

                        {(filterType === 'month' || filterType === 'year') && (
                            <select style={{marginRight: '15px'}} value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                                {[2023, 2024, 2025, 2026].map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        )}

                        {filterType === 'month' && (
                            <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                    <option key={month} value={month}>
                                        {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="movie-filter-row">
                        <div className="filter-with-search">
                            <div>
                                <p className='tooltip'>Type in the movie name and then select from the list</p>
                                <input 
                                    type="text" 
                                    placeholder="Search movies..."
                                    value={movieSearch}
                                    onChange={(e) => setMovieSearch(e.target.value)}
                                    className="search-input"
                                />
                                <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)} className="movie-select">
                                    <option value="all">All Movies</option>
                                    {movies
                                        .filter(movie => {
                                            const title = movie.title || `Movie ${movie.id}`;
                                            return title.toLowerCase().includes(movieSearch.toLowerCase());
                                        })
                                        .map(movie => (
                                            <option key={movie.id} value={movie.id}>
                                                {movie.title || `Movie ${movie.id}`}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="additional-filters-row">
                        <div>
                            <label>Theater: </label>
                            <select value={selectedTheater} onChange={(e) => setSelectedTheater(e.target.value)}>
                                <option value="all">All Theaters</option>
                                {theaters.map(theater => (
                                    <option key={theater.id} value={theater.id}>
                                        {theater.name || `Theater ${theater.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label>Auditorium: </label>
                            <select value={selectedAuditorium} onChange={(e) => setSelectedAuditorium(e.target.value)}>
                                <option value="all">All Auditoriums</option>
                                {auditoriums.map(auditorium => (
                                    <option key={auditorium.id} value={auditorium.id}>
                                        {auditorium.name || `Auditorium ${auditorium.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="statistics-summary">
                    <h3>Summary</h3>
                    <p>Total Tickets Sold: {totalTickets}</p>
                    <p>Total Revenue: ${(totalRevenue / 100).toFixed(2)}</p>
                </div>

                {loading ? (
                    <p>Loading statistics...</p>
                ) : aggregatedStats.length === 0 ? (
                    <p className="no-statistics">No statistics available</p>
                ) : (
                    <table className="statistics-table">
                        <thead>
                            <tr>
                                <th>Movie</th>
                                <th>Total Tickets Sold</th>
                                <th>Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aggregatedStats.map((stat) => (
                                <tr key={stat.movie_id}>
                                    <td>
                                        {stat.movie_title || `Movie ${stat.movie_id}`}
                                    </td>
                                    <td>{stat.tickets_sold}</td>
                                    <td>${(stat.total_revenue / 100).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Statistics;