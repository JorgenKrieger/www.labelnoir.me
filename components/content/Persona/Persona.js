// Libraries
import Image from 'next/image';
import { StructuredText } from 'react-datocms';
import { H, Section } from 'react-headings';
import classnames from 'classnames/bind';
import styles from './Persona.module.sass';

// Prepare classes
let cx = classnames.bind(styles);

// Helper functions
function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// Helper components
const Trait = ({ labelLeft, labelRight, value }) => {
    return (
        <div className={cx('trait')}>
            <span>{labelLeft}</span>
            <span>{labelRight}</span>
            <input
                type="range"
                min="0"
                max="100"
                value={value <= 1 ? value * 100 : value}
                disabled="disabled"
            />
        </div>
    );
};

const Motivation = ({ label, value }) => {
    return (
        <li style={{ '--value': value <= 1 ? value : value / 100 }}>
            <span>{label}</span>
        </li>
    );
};

// Component
const Persona = ({
    photo,
    occupation,
    status,
    location,
    archetype,
    motivation,
    personality,
    goals,
    frustrations,
}) => {
    const age = calculate_age(new Date(1989, 7, 26));

    return (
        <div className={cx('container', 'persona')}>
            <div className={cx('persona_heading')}>
                <H className={cx('heading')}>J&ouml;rgen Krieger</H>
                <dl className={cx('stats')}>
                    <div>
                        <dt>Age</dt>
                        <dd>{age}</dd>
                    </div>

                    {occupation && (
                        <div>
                            <dt>Occupation</dt>
                            <dd>{occupation}</dd>
                        </div>
                    )}

                    {status && (
                        <div>
                            <dt>Status</dt>
                            <dd>{status}</dd>
                        </div>
                    )}

                    {location && (
                        <div>
                            <dt>Location</dt>
                            <dd>{location}</dd>
                        </div>
                    )}

                    {archetype && (
                        <div>
                            <dt>Archetype</dt>
                            <dd>{archetype}</dd>
                        </div>
                    )}
                </dl>
            </div>

            <Section>
                <div className={cx('persona_body')}>
                    {photo && (
                        <figure>
                            <Image
                                src={photo.url}
                                width={photo.width}
                                height={photo.height}
                                alt={photo.alt}
                                placeholder="blur"
                                blurDataURL={photo.blurUpThumb}
                            />
                        </figure>
                    )}

                    {motivation && (
                        <div className={cx('persona_body_motivations')}>
                            <H className={cx('title')}>Motivations</H>
                            <ul className={cx('motivations')}>
                                {Object.keys(motivation).map((key) => (
                                    <Motivation key={key} label={key} value={motivation[key]} />
                                ))}
                            </ul>
                        </div>
                    )}

                    {personality && (
                        <div className={cx('persona_body_personality')}>
                            <H className={cx('title')}>Personality</H>

                            <Trait
                                labelLeft="Extrovert"
                                labelRight="Introvert"
                                value={personality['Energy']}
                            />
                            <Trait
                                labelLeft="Sensing"
                                labelRight="Intuitive"
                                value={personality['Information']}
                            />
                            <Trait
                                labelLeft="Thinking"
                                labelRight="Feeling"
                                value={personality['Decisions']}
                            />
                            <Trait
                                labelLeft="Judging"
                                labelRight="Perceiving"
                                value={personality['Lifestyle']}
                            />
                        </div>
                    )}

                    {goals && (
                        <div className={cx('persona_body_goals')}>
                            <H className={cx('title')}>Goals</H>
                            <StructuredText data={goals} />
                        </div>
                    )}

                    {frustrations && (
                        <div className={cx('persona_body_frustrations')}>
                            <H className={cx('title')}>Frustrations</H>
                            <StructuredText data={frustrations} />
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
};

// Export
export default Persona;
