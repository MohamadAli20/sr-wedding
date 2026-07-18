import { useState } from 'react';
import { submitRsvp } from '../../services/googleSheets';
import './RSVP.css';

const initial = {
    name: '',
    email: '',
    phone: '',
    attendance: 'yes',
    guests: '1',
    guest2Name: '',
    message: '',
};

export default function RSVP() {
    const [form, setForm] = useState(initial);
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const change = (e) => {
        const { name, value } = e.target;

        setForm((current) => ({
            ...current,
            [name]: value,
            ...(name === 'guests' && value === '1' ? { guest2Name: '' } : {}),
        }));
    };

    async function submit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            await submitRsvp({
                ...form,
                submittedAt: new Date().toISOString(),
            });

            setStatus('success');
            setForm(initial);
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    }

    return (
        <section id="rsvp" className="section rsvp">
            <div className="rsvp-intro">
                <p className="kicker">Will you join us?</p>

                <h2>
                    Kindly <em>RSVP</em>
                </h2>

                <p>
                    We would be delighted to celebrate this beautiful day with
                    you. Please respond by August 21, 2026.
                </p>
            </div>

            <form onSubmit={submit}>
                <label>
                    Guest name
                    <input
                        required
                        name="name"
                        value={form.name}
                        onChange={change}
                    />
                </label>

                <label>
                    Email address
                    <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={change}
                    />
                </label>

                <label>
                    Phone number
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={change}
                    />
                </label>

                <label>
                    Number of guests
                    <select
                        name="guests"
                        value={form.guests}
                        onChange={change}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </label>

                {form.guests === '2' && (
                    <label className="full">
                        Second guest&apos;s name
                        <input
                            required
                            name="guest2Name"
                            value={form.guest2Name}
                            onChange={change}
                        />
                    </label>
                )}

                <label className="full">
                    Will you attend?
                    <select
                        name="attendance"
                        value={form.attendance}
                        onChange={change}
                    >
                        <option value="yes">Joyfully accepts</option>
                        <option value="no">Regretfully declines</option>
                    </select>
                </label>

                <label className="full">
                    A message for the couple
                    <textarea
                        name="message"
                        rows="4"
                        value={form.message}
                        onChange={change}
                    />
                </label>

                <button
                    className="button"
                    disabled={status === 'loading'}
                >
                    {status === 'loading'
                        ? 'Sending…'
                        : 'Send RSVP'}
                </button>

                {status === 'success' && (
                    <p className="form-message success">
                        Thank you — we can’t wait to celebrate with you.
                    </p>
                )}

                {status === 'error' && (
                    <p className="form-message error">
                        {errorMessage}
                    </p>
                )}
            </form>
        </section>
    );
}
